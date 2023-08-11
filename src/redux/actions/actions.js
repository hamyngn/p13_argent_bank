import {
    LOGIN_REQUESTED,
    LOGOUT,
    GET_USER_REQUESTED,
    UPDATE_USER_REQUESTED,
} from './actionTypes'

export const loginRequest = ({email, password}) => {
  return {
    type: LOGIN_REQUESTED,
    email,
    password
  }
}

export const fetchUserRequest = () => {
  return {
    type: GET_USER_REQUESTED
  }
}

export const updateUserRequest = ({firstName, lastName}) => {
  return {
    type: UPDATE_USER_REQUESTED,
    firstName,
    lastName
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
    dispatch({
      type: LOGOUT,
    });
  };