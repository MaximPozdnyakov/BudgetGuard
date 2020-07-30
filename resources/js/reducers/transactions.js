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

            const money = action.payload
                .filter(t => t.wallet === action.walletId)
                .map(transaction => {
                    if (!transaction.moneySign) {
                        return -1 * transaction.moneyAmount;
                    }
                    return transaction.moneyAmount;
                });

            return {
                ...state,
                transactions: action.payload,
                transactionsFilters: {
                    dateRange: [
                        new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate() - 7,
                            0,
                            0,
                            0
                        ),
                        new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate(),
                            23,
                            59,
                            59
                        )
                    ],
                    categories: Object.keys(
                        _.groupBy(
                            action.payload.filter(
                                t => t.wallet === action.walletId
                            ),
                            "category"
                        )
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
            const allTransactionsMoney = state.transactions
                .filter(t => t.wallet === action.walletId)
                .map(transaction => {
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
                        _.groupBy(
                            state.transactions.filter(
                                t => t.wallet === action.walletId
                            ),
                            "category"
                        )
                    ),
                    moneyRange: [
                        Math.min(...allTransactionsMoney),
                        Math.max(...allTransactionsMoney)
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
        case "SET_SEARCH":
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    search: action.payload
                }
            };
        case "REMOVE_TRANSACTIONS":
            return {
                ...state,
                transactions: [],
                transactionsFilters: {}
            };
        default:
            return state;
    }
}
