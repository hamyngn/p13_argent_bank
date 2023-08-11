import { call, put, takeEvery } from 'redux-saga/effects'
import axios from "axios"
import jwt_decode from "jwt-decode";
import authHeader from "../../services/authHeader";
import { LOGIN_REQUESTED } from '../actions/actionTypes';

const apiUrl = "http://localhost:3001/api/v1/user/login";

const login = async ({email, password}) => {
   const user = {email: email, password: password}
   let data;
   await axios.post(apiUrl, user)
       .then((response) => {
           if (response.data.body.token) {
               localStorage.setItem("user", JSON.stringify(response.data));
           }
           data = response.data
           return data
           }
       )
       .catch(err => {
           console.error(err)
           throw err
       })
 };

function* fetchUser({email, password}) {
   try {
      const user = yield call(login, {email, password});
      yield put({type:'LOGIN_SUCCEEDED', user: user});
   } catch (e) {
      yield put({type:'LOGIN_FAILED', error: e.message});
   }
}

export function* checkToken() {
   const token = authHeader();
   const decoded = jwt_decode(token)
   if (decoded.exp < new Date()/1000) {
      localStorage.removeItem("user");
      yield put({type:'LOGOUT'})
   }
}

function* watchAuthSaga() {
   checkToken()
   yield takeEvery(LOGIN_REQUESTED, fetchUser);
}

export default watchAuthSaga;