import { combineReducers } from 'redux';
import chats from './chats';
import contacts from './contacts';

export default combineReducers({chats, contacts})