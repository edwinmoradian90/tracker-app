import { USER_TRACKER, USER_TRACKERS } from '../constants/trackers';

const initialState = {
    trackers: {},
    tracker: {},
};

const trackers = (state = initialState, actions) => {
    const { type, trackers, tracker } = actions;
    switch (type) {
        case USER_TRACKERS:
            return {
                ...state,
                trackers,
            };
        case USER_TRACKER:
            return {
                ...state,
                tracker,
            };
        default:
            return state;
    };
};

export default trackers;
