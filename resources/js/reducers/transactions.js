const initialState = {
    transactions: [],
    isTransactionsLoaded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
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
                })
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
        case "SORT_TRANSACTIONS_BY_DATE":
            return {
                ...state,
                transactions: state.transactions.sort(
                    (a, b) => new Date(a.spent_at) - new Date(b.spent_at)
                ),
                isTransactionsLoaded: true
            };
        default:
            return state;
    }
}
