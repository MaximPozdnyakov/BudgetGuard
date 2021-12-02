import _ from "lodash";
import { sub, startOfToday, endOfToday } from "date-fns";

import {
    SET_TRANSACTIONS,
    ADD_TRANSACTION,
    SET_TRANSACTION_ID,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    UPDATE_TRANSACTIONS_FILTERS,
    SET_DATE_RANGE,
    SET_CATEGORIES,
    SET_MONEY_RANGE,
    SET_SEARCH,
    REMOVE_TRANSACTIONS,
    SET_TRANSACTIONS_LOADED,
    SET_TRANSACTIONS_NOT_LOADED
} from "../constants";

const initialState = {
    transactions: [],
    isTransactionsLoaded: false,
    transactionsFilters: {}
};

const sortByDate = transactions =>
    transactions.sort((a, b) => new Date(a.spent_at) - new Date(b.spent_at));

const filterTransactionsByWallet = ({ transactions, walletId }) =>
    transactions.filter(({ wallet }) => wallet == walletId);

const getMoneyRange = ({ transactions, startDate, endDate }) => {
    const moneyData = transactions
        .filter(
            ({ spent_at }) =>
                new Date(spent_at) >= new Date(startDate) &&
                new Date(spent_at) <= new Date(endDate)
        )
        .map(
            ({ moneyAmount, moneySign }) =>
                moneyAmount * (moneySign == 0 ? -1 : 1)
        );
    return [Math.min(...moneyData), Math.max(...moneyData)];
};

const getCategories = transactions =>
    Object.keys(_.groupBy(transactions, "category"));

const getInitialDateRange = () => [
    sub(startOfToday(), { weeks: 1 }),
    endOfToday()
];

const getInitialFilters = ({ transactions, walletId }) => {
    const filteredTransactions = filterTransactionsByWallet({
        transactions,
        walletId
    });
    const dateRange = getInitialDateRange();
    return {
        dateRange,
        categories: getCategories(filteredTransactions),
        search: "",
        moneyRange: getMoneyRange({
            transactions: filteredTransactions,
            startDate: dateRange[0],
            endDate: dateRange[1]
        })
    };
};

const getUpdatedFilters = ({ transactions, walletId, dateRange }) => {
    const filteredTransactions = filterTransactionsByWallet({
        transactions,
        walletId
    });
    const [startDate, endDate] = dateRange;
    return {
        categories: getCategories(filteredTransactions),
        moneyRange: getMoneyRange({
            transactions: filteredTransactions,
            startDate,
            endDate
        })
    };
};

const setTransactions = (state, action) => {
    const { transactions, walletId } = action.payload;
    return {
        ...state,
        transactions: sortByDate(transactions),
        transactionsFilters: getInitialFilters({ transactions, walletId }),
        isTransactionsLoaded: true
    };
};

const addTransaction = (state, action) => {
    const { newTransaction, walletId } = action.payload;
    const transactions = sortByDate([...state.transactions, newTransaction]);
    const dateRange = state.transactionsFilters.dateRange;
    return {
        ...state,
        transactions,
        transactionsFilters: {
            ...state.transactionsFilters,
            ...getUpdatedFilters({ transactions, walletId, dateRange })
        }
    };
};

const updateTransaction = (state, action) => {
    const { updatedTransaction, walletId } = action.payload;
    const transactions = sortByDate(
        state.transactions.map(transaction =>
            transaction.id === updatedTransaction.id
                ? updatedTransaction
                : transaction
        )
    );
    const dateRange = state.transactionsFilters.dateRange;
    return {
        ...state,
        transactions,
        transactionsFilters: {
            ...state.transactionsFilters,
            ...getUpdatedFilters({ transactions, walletId, dateRange })
        }
    };
};

const deleteTransaction = (state, action) => {
    const { id, walletId } = action.payload;
    const transactions = state.transactions.filter(
        transaction => transaction.id !== id
    );
    const dateRange = state.transactionsFilters.dateRange;
    return {
        ...state,
        transactions,
        transactionsFilters: {
            ...state.transactionsFilters,
            ...getUpdatedFilters({ transactions, walletId, dateRange })
        }
    };
};

const setTransactionId = (state, action) => {
    const { newId, temporaryId } = action.payload;
    const transactions = state.transactions.map(transaction => {
        if (transaction.temporaryId === temporaryId) {
            transaction.id = newId;
        }
        return transaction;
    });
    return {
        ...state,
        transactions
    };
};

export default function(state = initialState, action) {
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
        case UPDATE_TRANSACTIONS_FILTERS:
            const { walletId } = action.payload;
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    ...getUpdatedFilters({
                        transactions: state.transactions,
                        walletId,
                        dateRange: state.transactionsFilters.dateRange
                    })
                }
            };
        case SET_DATE_RANGE:
            const { dateRange } = action.payload;
            return {
                ...state,
                transactionsFilters: { ...state.transactionsFilters, dateRange }
            };
        case SET_CATEGORIES:
            const { categories } = action.payload;
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    categories
                }
            };
        case SET_MONEY_RANGE:
            const { moneyRange } = action.payload;
            return {
                ...state,
                transactionsFilters: {
                    ...state.transactionsFilters,
                    moneyRange
                }
            };
        case SET_SEARCH:
            const { search } = action.payload;
            return {
                ...state,
                transactionsFilters: { ...state.transactionsFilters, search }
            };
        case REMOVE_TRANSACTIONS:
            return { ...state, transactions: [], transactionsFilters: {} };
        case SET_TRANSACTIONS_LOADED:
            return { ...state, isTransactionsLoaded: true };
        case SET_TRANSACTIONS_NOT_LOADED:
            return { ...state, isTransactionsLoaded: false };
        default:
            return state;
    }
}
