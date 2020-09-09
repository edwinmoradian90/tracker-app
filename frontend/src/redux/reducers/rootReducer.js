import { combineReducers } from 'redux';
import sessions from './sessions';
import users from './users';
import trackers from './trackers';

const rootReducer = () => {
    combineReducers({
        sessions,
        users,
        trackers,
    });
};

export default rootReducer;