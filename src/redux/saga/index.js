import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import apiSaga from './apiSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    apiSaga()
  ])
}