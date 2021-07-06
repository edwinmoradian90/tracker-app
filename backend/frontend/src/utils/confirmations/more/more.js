import { removeCurrentUser } from '../../helpers/sessionHelpers';
import { deleteUser } from '../../helpers/userHelpers';

const moreData = [
    null,
    null,
    {
        affirmation: 'You are now logged out.',
        message: 'Are you sure you want to log out?',
        confirm: removeCurrentUser
    },
    null,
    {
        affirmation: 'Your account has been deleted.',
        message: `
            Are you sure you want to delete your account?
            This cannot be undone.
        `,
        confirm: deleteUser,
    },
];

export { moreData };