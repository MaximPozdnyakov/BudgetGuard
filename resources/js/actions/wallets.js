import walletService from "../services/walletService";

import { setMessage } from "./messages";

// GET Wallets
export const getWallets = () => async (dispatch, getState) => {
    const wallets = await walletService.fetchWallets();
    if (!wallets.isError) {
        dispatch({
            type: "GET_WALLETS",
            payload: wallets
        });
        if (wallets.length !== 0) {
            dispatch({
                type: "SET_CURRENT_WALLET",
                payload: wallets[0]
            });
        }
    }
    dispatch({
        type: "WALLETS_LOADED"
    });
};

// ADD Wallet
export const addWallet = wallet => async (dispatch, getState) => {
    dispatch({
        type: "WALLETS_NOT_LOADED"
    });
    const newWallet = await walletService.createWallet(wallet);
    if (newWallet.isError) {
        dispatch(setMessage(newWallet.errors.errors, "alert", true));
    } else {
        dispatch({
            type: "ADD_WALLET",
            payload: newWallet
        });
        dispatch({
            type: "SET_CURRENT_WALLET",
            payload: newWallet
        });
    }
    dispatch({
        type: "WALLETS_LOADED"
    });
};

export const selectWallet = wallet => async (dispatch, getState) => {
    dispatch({
        type: "WALLETS_NOT_LOADED"
    });
    dispatch({
        type: "SET_CURRENT_WALLET",
        payload: wallet
    });
    dispatch({
        type: "UPDATE_TRANSACTIONS_FILTERS",
        walletId: getState().wallets.currentWallet.id
    });
    dispatch({
        type: "WALLETS_LOADED"
    });
};

export const removeWallets = () => dispatch => {
    dispatch({
        type: "REMOVE_WALLETS"
    });
    dispatch({
        type: "WALLETS_NOT_LOADED"
    });
};
