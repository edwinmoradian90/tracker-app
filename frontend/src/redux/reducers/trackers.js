import { USER_TRACKER, USER_TRACKERS } from '../constants/trackers';

const initialState = {
    trackers: {},
    tracker: {},
};

const trackers = (state = initialState, actions) => {
    const { type, trackers, tracker } = actions;
    switch (type) {
        case USER_TRACKERS:
            console.log('User trackers works', trackers);
            return {
                ...state,
                trackers,
            };
        case USER_TRACKER:
            console.log('Selected tracker works', tracker);
            return {
                ...state,
                tracker,
            };
        default:
            return state;
    };
};

export default trackers;
