import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

// switch-case function - if an action is called that the reducer is not responsible for, it will just return what is was given
// the reducer only cares about the action it's responsible for
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

// this is a combined reducer, made of the 2 reducers above
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;