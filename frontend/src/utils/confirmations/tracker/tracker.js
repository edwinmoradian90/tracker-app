import { deleteTracker } from '../../../redux/actions/trackers';

const trackerData = [
    {
        affirmation: 'Tracker deleted.',
        message: 'Are you sure you want to delete this tracker?',
        confirm: (id) => deleteTracker(id),
    },
];

export { trackerData };