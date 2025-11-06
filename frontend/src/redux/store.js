import { createStore } from 'redux';
import { reducers } from './reducers';
const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');
const initialState = { userData: savedUser ? JSON.parse(savedUser) : {}, userToken: savedToken || '' };
const mystore = createStore(reducers, initialState);
export default mystore;
