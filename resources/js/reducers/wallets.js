import {
    SET_WALLETS,
    ADD_WALLET,
    SET_CURRENT_WALLET,
    REMOVE_WALLETS,
    SET_WALLETS_LOADED,
    SET_WALLETS_NOT_LOADED
} from "../constants/redux";

const initialState = {
    wallets: [],
    isWalletsLoaded: false,
    currentWallet: {}
};

export default function(state = initialState, action) {
    const { wallet } = action.payload || {};
    switch (action.type) {
        case SET_WALLETS:
            const { wallets, currentWallet } = action.payload;
            return {
                ...state,
                wallets,
                isWalletsLoaded: true,
                currentWallet
            };
        case ADD_WALLET:
            return {
                ...state,
                wallets: [...state.wallets, wallet],
                currentWallet: wallet
            };
        case SET_CURRENT_WALLET:
            return { ...state, currentWallet: wallet };
        case REMOVE_WALLETS:
            return { ...state, wallets: [], currentWallet: {} };
        case SET_WALLETS_LOADED:
            return { ...state, isWalletsLoaded: true };
        case SET_WALLETS_NOT_LOADED:
            return { ...state, isWalletsLoaded: false };
        default:
            return state;
    }
}
