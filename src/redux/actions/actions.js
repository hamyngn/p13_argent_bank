import authService from '../../services/authService'
import profileService from '../../services/profileService'
import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGOUT,
    UPDATE,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from './actionTypes'


export const login =  (email, password) => async (dispatch) => {
    const {data, error} = await authService.login(email, password)
      if (data) {
        dispatch({
          type: LOGIN_SUCCEEDED,
          payload: { user: data },
        });
        
        return Promise.resolve();
      }
      if (error) {
        dispatch({
          type: LOGIN_FAILED,
        })

        dispatch({
          type: SET_MESSAGE,
          payload: error.response.data.message,
        });
    
        return Promise.reject();
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