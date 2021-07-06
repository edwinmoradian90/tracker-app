import { combineReducers } from 'redux';
import sessions from './sessions';
import users from './users';
import trackers from './trackers';

export default combineReducers({
    sessions,
    users,
    trackers,
});
