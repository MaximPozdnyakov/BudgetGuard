import { SET_USER, LOGOUT, SET_USER_LOADED } from "../constants/redux";

import userService from "../services/userService";

import { setMessage } from "./messages";
import { removeTransactions, fetchTransactions } from "./transactions";
import { removeWallets, fetchWallets } from "./wallets";

export const fetchUser = () => async dispatch => {
    const { fetchUser } = userService;
    const user = await fetchUser();
    if (!user.isError) {
        dispatch({ type: SET_USER, payload: { user } });
    }
    dispatch({ type: SET_USER_LOADED });
};

export const register = credentials => async dispatch => {
    const { register } = userService;
    const { isError, errors, access_token, user } = await register(credentials);

    if (isError) {
        dispatch(
            setMessage({ messages: errors, type: "alert", isError: true })
        );
        return { isSuccess: false };
    }

    localStorage.setItem("token", access_token);
    dispatch(
        setMessage({
            messages: "You are registered successfully!",
            type: "toast",
            isError: false
        })
    );
    dispatch({ type: SET_USER, payload: { user } });
    return { isSuccess: true };
};

export const login = credentials => async dispatch => {
    const { login } = userService;
    const { isError, access_token, user } = await login(credentials);

    if (isError) {
        dispatch(
            setMessage({
                messages: "Email and password don't match",
                type: "alert",
                isError: true
            })
        );
        return { isSuccess: false };
    }

    localStorage.setItem("token", access_token);
    dispatch({ type: SET_USER, payload: { user } });
    await Promise.all([
        dispatch(fetchWallets()),
        dispatch(fetchTransactions())
    ]);
    dispatch(
        setMessage({
            messages: "You are successfully logged in!",
            type: "toast",
            isError: false
        })
    );
    return { isSuccess: true };
};

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
    dispatch(removeWallets());
    dispatch(removeTransactions());
    dispatch(
        setMessage({
            messages: "You are successfully logged out!",
            type: "toast",
            isError: false
        })
    );
    const { logout } = userService;
    await logout();
    localStorage.removeItem("token");
};
