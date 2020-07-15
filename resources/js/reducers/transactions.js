const initialState = {
    transactions: [],
    isTransactionsLoaded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload,
                isTransactionsLoaded: true
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
                isTransactionsLoaded: true
            };
        case "UPDATE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.map(transaction => {
                    if (transaction.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return transaction;
                    }
                }),
                isTransactionsLoaded: true
            };
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    transaction => transaction.id !== action.payload
                ),
                isTransactionsLoaded: true
            };
        case "TRANSACTION_NOT_LOADED":
            return {
                ...state,
                isTransactionsLoaded: false
            };
        default:
            return state;
    }
}
