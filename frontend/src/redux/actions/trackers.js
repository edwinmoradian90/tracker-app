import { USER_TRACKERS } from '../constants/trackers';

const userTrackers = trackers => ({
    type: USER_TRACKERS,
    trackers,
});

export { userTrackers };