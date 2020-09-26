import {
    GET_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../constants/sessions';

const currentUser = user => ({
    type: GET_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

export { currentUser, logoutCurrentUser };