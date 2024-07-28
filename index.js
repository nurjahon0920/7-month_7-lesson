const redux = require("redux");
const createStore = redux.createStore;
const BUY_CAKE = "BUY_CAKE";
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const GET_TODOS = "GET_TODOS";
const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), task },
});
const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
const updateTodo = (id, newTask) => ({
  type: UPDATE_TODO,
  payload: { id, task: newTask },
});
const getTodos = () => ({
  type: GET_TODOS,
});
const buy_cake = () => {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
};
const initialState = {
  todos: [],
  numOfIceCreams: 10,
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                task: action.payload.task,
              }
            : todo
        ),
      };
    case GET_TODOS:
      console.log(state.todos);
      return state;
    default:
      return state;
  }
};
const store = createStore(todoReducer);
store.subscribe(() => console.log("Initial state", store.getState()));
store.dispatch(addTodo("lorem"));
store.dispatch(getTodos());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
