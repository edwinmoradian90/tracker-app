import { GET_CURRENT_USER } from '../constants/sessions';

const currentUser = user => ({
    type: GET_CURRENT_USER,
    user
});

export { currentUser };