import {
    SET_WALLETS,
    ADD_WALLET,
    SET_CURRENT_WALLET,
    REMOVE_WALLETS,
    UPDATE_TRANSACTIONS_FILTERS,
    SET_WALLETS_LOADED
} from "../constants";

import walletService from "../services/walletService";

export const fetchWallets = () => async dispatch => {
    const { fetchWallets } = walletService;
    const wallets = await fetchWallets();
    if (wallets.isError) dispatch({ type: SET_WALLETS_LOADED });
    else dispatch({ type: SET_WALLETS, payload: { wallets } });
};

export const addWallet = wallet => async dispatch => {
    dispatch({ type: ADD_WALLET, payload: { wallet } });
    const { createWallet } = walletService;
    await createWallet(wallet);
};

export const selectWallet = wallet => async dispatch => {
    dispatch({ type: SET_CURRENT_WALLET, payload: { wallet } });
    dispatch({
        type: UPDATE_TRANSACTIONS_FILTERS,
        payload: { walletId: wallet.id }
    });
};

export const removeWallets = () => dispatch => {
    dispatch({ type: REMOVE_WALLETS });
};
