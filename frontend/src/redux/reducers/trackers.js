import { USER_TRACKERS } from '../constants/trackers';

const initialState = {
    trackers: {},
};

const trackers = (state = initialState, actions) => {
    const { type, trackers } = actions;
    switch (type) {
        case USER_TRACKERS:
            console.log('User trackers works', trackers);
            return {
                ...state,
                trackers,
            };
        default:
            return state;
    };
};

export default trackers;
