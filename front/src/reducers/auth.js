export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user };
        case 'LOGOUT': {
            const { user, ...rest } = state;
            return rest;
        }
        default:
            return state;
    }
}
