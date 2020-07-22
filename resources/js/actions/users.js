import userService from "../services/userService";

import { setMessage } from "./messages";

// GET AUTHENTICATED USER
const getAuthenticatedUser = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.fetchUser();
    const googleUser = await userService.fetchGoogleUser();

    if (user.isError && googleUser.isError) {
        dispatch({
            type: "USER_LOADED"
        });
    } else if (googleUser.isError) {
        dispatch({
            type: "SET_USER",
            payload: user
        });
        dispatch({
            type: "USER_LOADED"
        });
    } else if (user.isError) {
        dispatch({
            type: "SET_USER",
            payload: {
                id: googleUser.id,
                name: googleUser.name,
                isGoogleUser: true
            }
        });
        dispatch({
            type: "USER_LOADED"
        });
    }
};

// REGISTER
const register = credentials => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });
    const errorRegister = await userService.register(credentials);
    if (errorRegister.isError) {
        dispatch(setMessage(errorRegister.errors.errors, "alert", true));
        dispatch({
            type: "USER_LOADED"
        });
    } else {
        dispatch(
            setMessage("You are registered successfully!", "toast", false)
        );
        dispatch({
            type: "USER_LOADED"
        });
        return true;
    }
};

// LOGIN
const login = credentials => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const token = await userService.login(credentials);

    if (token.isError) {
        dispatch(
            setMessage(
                { unauthorized: ["Email and password don't match"] },
                "alert",
                true
            )
        );
        dispatch({
            type: "USER_LOADED"
        });
    } else {
        localStorage.setItem("token", token.access_token);
        dispatch(setMessage("You are successfully logged in!", "toast", false));
        return true;
    }
};

// NOT_LOADED
const notLoaded = () => (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });
};

// LOGOUT
const logout = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.logout();
    if (!user.isError) {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT"
        });
        dispatch(
            setMessage("You are successfully logged out!", "toast", false)
        );
        dispatch({
            type: "USER_LOADED"
        });
    }
};

const logoutGoogle = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.logoutGoogle();
    if (!user.isError) {
        dispatch({
            type: "LOGOUT"
        });
        dispatch(
            setMessage("You are successfully logged out!", "toast", false)
        );
        dispatch({
            type: "USER_LOADED"
        });
    }
};

export default {
    getAuthenticatedUser,
    register,
    login,
    logout,
    notLoaded,
    logoutGoogle
};
