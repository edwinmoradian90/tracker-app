import { GET_CURRENT_USER } from '../constants/sessions';

const initialState = {
    currentUser: {},
};

const sessions = (state = initialState, action) => {
    const { type, user } = action;
    switch (type) {
        case GET_CURRENT_USER:
            console.log('It worked', user);
            return {
                ...state,
                currentUser: user
            };
        default:
            console.log('default');
            return state;
    };
};

export default sessions;