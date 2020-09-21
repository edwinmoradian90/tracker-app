import axios from 'axios';
import {
    USER_TRACKER,
    USER_TRACKERS,
    DELETE_TRACKER,
} from '../constants/trackers';
import { getToken } from '../../utils/helpers/sessionHelpers';

const userTrackers = trackers => ({
    type: USER_TRACKERS,
    trackers,
});

const userTracker = tracker => ({
    type: USER_TRACKER,
    tracker
});

const deleteTracker = id => {
    const token = getToken();
    const url = `http://localhost:3001/trackers/${id}`;
    const headers = {
        'Authorization': token,
    };
    axios.delete(url, { headers })
        .then(res => {
            console.log(res);
            return true;
        })
        .catch(err => console.log(err));
    return {
        type: DELETE_TRACKER,
    };
};


export {
    userTrackers,
    userTracker,
    deleteTracker,
};