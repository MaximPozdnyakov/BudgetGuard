import {
    SET_WALLETS,
    ADD_WALLET,
    SET_CURRENT_WALLET,
    REMOVE_WALLETS,
    RESET_TRANSACTIONS_FILTERS,
    SET_WALLETS_LOADED,
    SET_WALLETS_NOT_LOADED
} from "../constants/redux";

import walletService from "../services/walletService";

export const fetchWallets = () => async (dispatch, getState) => {
    const { isUserAuthenticated } = getState().user;
    if (!isUserAuthenticated) {
        dispatch({ type: SET_WALLETS_LOADED });
        return;
    }
    dispatch({ type: SET_WALLETS_NOT_LOADED });

    const { fetchWallets } = walletService;
    const wallets = await fetchWallets();
    const currentWallet =
        wallets.find(({ id }) => id == localStorage.getItem("walletId")) ||
        wallets[0] ||
        {};
    if (wallets.isError) dispatch({ type: SET_WALLETS_LOADED });
    else dispatch({ type: SET_WALLETS, payload: { wallets, currentWallet } });
};

export const createWallet = newWallet => async dispatch => {
    const { createWallet } = walletService;
    const wallet = await createWallet(newWallet);

    localStorage.setItem("walletId", wallet.id);
    dispatch({ type: ADD_WALLET, payload: { wallet } });
    dispatch({
        type: RESET_TRANSACTIONS_FILTERS,
        payload: { walletId: wallet.id }
    });
};

export const selectWallet = wallet => async dispatch => {
    localStorage.setItem("walletId", wallet.id);
    dispatch({ type: SET_CURRENT_WALLET, payload: { wallet } });
    dispatch({
        type: RESET_TRANSACTIONS_FILTERS,
        payload: { walletId: wallet.id }
    });
};

export const removeWallets = () => dispatch => {
    dispatch({ type: REMOVE_WALLETS });
};
