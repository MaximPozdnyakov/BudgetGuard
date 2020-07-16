import _ from "lodash";

const initialState = {
    transactions: [],
    isTransactionsLoaded: false,
    transactionsFilters: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            const currentDate = new Date();
            const monthAgo = new Date(
                currentDate.setMonth(currentDate.getMonth() - 1)
            );

            const money = action.payload.map(transaction => {
                if (!transaction.moneySign) {
                    return -1 * transaction.moneyAmount;
                }
                return transaction.moneyAmount;
            });

            return {
                ...state,
                transactions: action.payload,
                transactionsFilters: {
                    dateRange: [monthAgo, new Date()],
                    categories: Object.keys(
                        _.groupBy(action.payload, "category")
                    ),
                    search: "",
                    moneyRange: [Math.min(...money), Math.max(...money)]
                }
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
                )
            };
        case "TRANSACTION_NOT_LOADED":
            return {
                ...state,
                isTransactionsLoaded: false
            };
        case "TRANSACTION_LOADED":
            return {
                ...state,
                isTransactionsLoaded: true
            };
        case "SORT_TRANSACTIONS_BY_DATE":
            return {
                ...state,
                transactions: state.transactions.sort(
                    (a, b) => new Date(a.spent_at) - new Date(b.spent_at)
                )
            };
        case "UPDATE_TRANSACTIONS_FILTERS":
            const transactionsMoney = state.transactions.map(transaction => {
                if (!transaction.moneySign) {
                    return -1 * transaction.moneyAmount;
                }
                return transaction.moneyAmount;
            });

            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    categories: Object.keys(
                        _.groupBy(state.transactions, "category")
                    ),
                    moneyRange: [
                        Math.min(...transactionsMoney),
                        Math.max(...transactionsMoney)
                    ]
                }
            };
        case "SET_DATE_RANGE":
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    dateRange: action.payload
                }
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    categories: action.payload
                }
            };
        case "SET_MONEY_RANGE":
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    moneyRange: action.payload
                }
            };
        default:
            return state;
    }
}
