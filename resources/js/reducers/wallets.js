const initialState = {
    wallets: [],
    isWalletsLoaded: false,
    currentWallet: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_WALLETS":
            return {
                ...state,
                wallets: action.payload
            };
        case "ADD_WALLET":
            return {
                ...state,
                wallets: [...state.wallets, action.payload]
            };
        case "WALLETS_NOT_LOADED":
            return {
                ...state,
                isWalletsLoaded: false
            };
        case "WALLETS_LOADED":
            return {
                ...state,
                isWalletsLoaded: true
            };
        case "SET_CURRENT_WALLET":
            return {
                ...state,
                currentWallet: action.payload
            };
        case "REMOVE_WALLETS":
            return {
                ...state,
                wallets: [],
                currentWallet: {}
            };
        default:
            return state;
    }
}
