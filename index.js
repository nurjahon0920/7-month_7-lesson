const redux = require("redux");
const createStore = redux.createStore;
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const GET_TODOS = "GET_TODOS";

let nextTodoId = 1;

const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { id: nextTodoId++, task },
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

const getTodos = () => ({
  type: GET_TODOS,
});

const initialState = {
  todos: [],
  numOfTodo: 0,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        numOfTodo: state.numOfTodo + 1,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        numOfTodo: state.numOfTodo - 1,
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

store.subscribe(() => console.log("State updated", store.getState()));

store.dispatch(addTodo("lorem"));
store.dispatch(addTodo("ipsum"));
store.dispatch(addTodo("dolor"));

store.dispatch(removeTodo(1));
store.dispatch(removeTodo(2));
store.dispatch(removeTodo(3));

store.dispatch(getTodos());
