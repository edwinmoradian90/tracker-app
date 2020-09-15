import { USER_TRACKER, USER_TRACKERS } from '../constants/trackers';

const userTrackers = trackers => ({
    type: USER_TRACKERS,
    trackers,
});

const userTracker = tracker => ({
    type: USER_TRACKER,
    tracker
});

export { userTrackers, userTracker };