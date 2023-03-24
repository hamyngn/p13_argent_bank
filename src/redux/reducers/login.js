import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions/actionTypes'

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? {isLoggedIn: true, user} : {isLoggedIn: false, user}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user: user,
      };
    }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

export default login;