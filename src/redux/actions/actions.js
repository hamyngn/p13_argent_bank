import loginService from '../../services/loginService';
import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    SET_MESSAGE,
} from './actionTypes'


export const login =  (email, password) => (dispatch) => {
    loginService.login(email, password).then(
      (data) => {
        console.log(email, password)
        dispatch({
          type: LOGIN_SUCCEEDED,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        console.log(error)
        dispatch({
          type: LOGIN_FAILED,
        });
    
        return Promise.reject();
    }
)}