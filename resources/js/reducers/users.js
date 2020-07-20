const initialState = {
    user: {},
    isUserAuthenticated: false,
    isUserLoaded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isUserAuthenticated: true
            };
        case "LOGOUT":
            return {
                ...state,
                user: {},
                isUserAuthenticated: false
            };
        case "USER_LOADED":
            return {
                ...state,
                isUserLoaded: true
            };
        case "USER_NOT_LOADED":
            return {
                ...state,
                isUserLoaded: false
            };
        default:
            return state;
    }
}
