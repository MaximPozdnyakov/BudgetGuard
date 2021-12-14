import {
    SET_TRANSACTIONS,
    ADD_TRANSACTION,
    SET_TRANSACTION_ID,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    RESET_TRANSACTIONS_FILTERS,
    SET_DATE_RANGE,
    SET_CATEGORIES,
    SET_MONEY_RANGE,
    SET_SEARCH,
    REMOVE_TRANSACTIONS,
    SET_TRANSACTIONS_LOADED,
    SET_TRANSACTIONS_NOT_LOADED
} from "../constants/redux";

import { resetFilters, syncFilters } from "../helpers/transactions";

const setTransactions = (state, action) => {
    const { transactions, walletId } = action.payload;
    const { dateRange } = state.filters;
    return {
        transactions,
        isTransactionsLoaded: true,
        filters: {
            ...state.filters,
            ...resetFilters(transactions, walletId, dateRange)
        }
    };
};

const addTransaction = (state, action) => {
    const { newTransaction, walletId } = action.payload;
    const transactions = [...state.transactions, newTransaction];
    return {
        ...state,
        transactions,
        filters: {
            ...state.filters,
            ...syncFilters(state, transactions, walletId)
        }
    };
};

const updateTransaction = (state, action) => {
    const { updatedTransaction, walletId } = action.payload;
    const transactions = state.transactions.map(transaction =>
        transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction
    );
    return {
        ...state,
        transactions,
        filters: {
            ...state.filters,
            ...syncFilters(state, transactions, walletId)
        }
    };
};

const deleteTransaction = (state, action) => {
    const { id, walletId } = action.payload;
    const transactions = state.transactions.filter(
        transaction => transaction.id !== id
    );
    return {
        ...state,
        transactions,
        filters: {
            ...state.filters,
            ...syncFilters(state, transactions, walletId)
        }
    };
};

const setTransactionId = (state, action) => {
    const { newId, temporaryId } = action.payload;
    const transactions = state.transactions.map(transaction => ({
        ...transaction,
        id: transaction.temporaryId === temporaryId ? newId : id
    }));
    return { ...state, transactions };
};

const setDateRange = (state, action) => {
    const { dateRange, walletId } = action.payload;
    return {
        ...state,
        filters: {
            dateRange,
            ...resetFilters(state.transactions, walletId, dateRange)
        }
    };
};

export default function(state = {}, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return setTransactions(state, action);
        case ADD_TRANSACTION:
            return addTransaction(state, action);
        case SET_TRANSACTION_ID:
            return setTransactionId(state, action);
        case UPDATE_TRANSACTION:
            return updateTransaction(state, action);
        case DELETE_TRANSACTION:
            return deleteTransaction(state, action);
        case RESET_TRANSACTIONS_FILTERS:
            const { walletId } = action.payload || {};
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...resetFilters(
                        state.transactions,
                        walletId,
                        state.filters.dateRange
                    )
                }
            };
        case SET_DATE_RANGE:
            return setDateRange(state, action);
        case SET_CATEGORIES:
            const { categories } = action.payload;
            return { ...state, filters: { ...state.filters, categories } };
        case SET_MONEY_RANGE:
            const { moneyRange } = action.payload;
            return { ...state, filters: { ...state.filters, moneyRange } };
        case SET_SEARCH:
            const { search } = action.payload;
            return { ...state, filters: { ...state.filters, search } };
        case REMOVE_TRANSACTIONS:
            return { ...state, transactions: [], filters: {} };
        case SET_TRANSACTIONS_LOADED:
            return { ...state, isTransactionsLoaded: true };
        case SET_TRANSACTIONS_NOT_LOADED:
            return { ...state, isTransactionsLoaded: false };
        default:
            return state;
    }
}
