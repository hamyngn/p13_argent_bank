import { call, put, takeEvery } from 'redux-saga/effects'
import axios from "axios"
import authHeader from "../../services/authHeader";
import { GET_USER_REQUESTED, UPDATE_USER_REQUESTED } from '../actions/actionTypes';
import {checkToken} from './authSaga'

const API_URL = "http://localhost:3001/api/v1/user/profile";

const getUser = async () => {
    const token = authHeader();
    let user
    await axios.get(API_URL, { headers: {'Authorization' : `Bearer ${token}` }})
    .then(res => user = res.data.body)
    .catch(error => {throw error}); 
    return user
}

const editUser = ({firstName, lastName}) => {
    const user = {
        firstName: firstName,
        lastName: lastName
    }
    
    const token = authHeader();
    axios.put(API_URL, user, { headers: {'Authorization' : `Bearer ${token}` }})
    .then(res=> console.log(res))
    .catch(error => {throw error})
    return user;
}

function* fetchUser() {
    try {
        const user = yield call(getUser);
        yield put({type:'FETCH_SUCCEEDED', user: user});
     } catch (e) {
        yield put({type:'FETCH_FAILED', error: e.message});
     }
}

function* updateUser({firstName, lastName}) {
   try {
      const user = yield call(editUser, {firstName, lastName});
      yield put({type:'UPDATE_SUCCEEDED', user: user});
   } catch (e) {
      yield put({type:'FETCH_FAILED', error: e.message});
   }
}

function* watchApiSaga() {
    checkToken()
   yield takeEvery(UPDATE_USER_REQUESTED, updateUser);
   yield takeEvery(GET_USER_REQUESTED, fetchUser)
}

export default watchApiSaga;