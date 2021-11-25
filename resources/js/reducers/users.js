import { SET_USER, LOGOUT, SET_USER_LOADED } from "../constants";

const initialState = {
    user: {},
    isUserAuthenticated: false,
    isUserLoaded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            const { user } = action.payload;
            return {
                ...state,
                user,
                isUserAuthenticated: true,
                isUserLoaded: true
            };
        case LOGOUT:
            return { ...state, user: {}, isUserAuthenticated: false };
        case SET_USER_LOADED:
            return { ...state, isUserLoaded: true };
        default:
            return state;
    }
}
