export default (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.user };
        case "LOGOUT":
            return { ...state, user: undefined };
        default:
            return state;
    }
}
