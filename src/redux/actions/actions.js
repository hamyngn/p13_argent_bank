import authService from '../../services/authService'
import profileService from '../../services/profileService'
import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGOUT,
    UPDATE,
} from './actionTypes'


export const login =  (email, password) => async (dispatch) => {
    const data = await authService.login(email, password)
      if (data) {
        dispatch({
          type: LOGIN_SUCCEEDED,
          payload: { user: data },
        });
  
        return Promise.resolve();
      }
      else {
        dispatch({
          type: LOGIN_FAILED,
        });
    
        return Promise.reject();
    }
}

export const logout = () => (dispatch) => {
    authService.logout();
  
    dispatch({
      type: LOGOUT,
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