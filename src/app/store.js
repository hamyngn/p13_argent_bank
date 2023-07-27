import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../redux/reducers'
import rootSaga from '../redux/saga/index';
import createSagaMiddleware from 'redux-saga';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware]
})
sagaMiddleware.run(rootSaga);
export default store;

