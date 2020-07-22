import userService from "../services/userService";

import { setMessage } from "./messages";

// GET AUTHENTICATED USER
const getAuthenticatedUser = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.fetchUser();

    if (user.isError) {
        dispatch({
            type: "USER_LOADED"
        });
    } else {
        dispatch({
            type: "SET_USER",
            payload: user
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

// LOGIN WITH GOOGLE
const loginGoogle = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.loginGoogle();
    console.log("user", user);
    if (user.isError) {
        dispatch({
            type: "USER_LOADED"
        });
    } else {
        dispatch({
            type: "SET_USER",
            payload: user
        });
        dispatch(setMessage("You are successfully logged in!", "toast", false));
        return true;
    }
};

// LOGOUT
const logout = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_NOT_LOADED"
    });

    const user = await userService.logout();
    if (user.isError) {
        dispatch(setMessage(user.errors.errors, "alert", true));
        dispatch({
            type: "USER_LOADED"
        });
    } else {
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

export default { getAuthenticatedUser, register, login, logout, loginGoogle };
