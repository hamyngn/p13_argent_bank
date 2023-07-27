import authService from '../../services/authService'
import profileService from '../../services/profileService'
import {
    LOGIN_REQUESTED,
    LOGOUT,
    UPDATE,
    CLEAR_MESSAGE
} from './actionTypes'

export const loginRequest = ({email, password}) => {
  return {
    type: LOGIN_REQUESTED,
    email,
    password
  }
}

export const logout = () => (dispatch) => {
    authService.logout();
  
    dispatch({
      type: LOGOUT,
    });

    dispatch({
      type: CLEAR_MESSAGE,
    });
  };

export const update = (firstName, lastName) => (dispatch) => {
    const data = profileService.editUser(firstName, lastName);
    if(data) {
      dispatch({
        type: UPDATE,
        payload: {user: data}
      })
    }
   
}