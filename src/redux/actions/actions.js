import loginService from '../../services/loginService';
import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    SET_MESSAGE,
} from './actionTypes'


export const login =  (email, password) => async (dispatch) => {
    const data = await loginService.login(email, password)
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