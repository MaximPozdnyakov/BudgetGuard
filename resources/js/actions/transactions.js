import transactionService from "../services/transactionService";

import { setMessage } from "./messages";

// GET Transactions
export const getTransactions = () => async (dispatch, getState) => {
    const transactions = await transactionService.fetchTransactions();

    if (!transactions.isError) {
        dispatch({
            type: "GET_TRANSACTIONS",
            payload: transactions,
            walletId: getState().wallets.currentWallet.id
        });
        dispatch({
            type: "SORT_TRANSACTIONS_BY_DATE"
        });
    }
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

// ADD Transaction
export const addTransaction = transaction => async (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });
    const newTransaction = await transactionService.createTransaction(
        transaction
    );

    if (newTransaction.isError) {
        dispatch(setMessage(newTransaction.errors.errors, "alert", true));
    } else {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: newTransaction
        });
        dispatch({
            type: "SORT_TRANSACTIONS_BY_DATE"
        });
        dispatch({
            type: "UPDATE_TRANSACTIONS_FILTERS",
            walletId: getState().wallets.currentWallet.id
        });
    }
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

// UPDATE Transaction
export const updateTransaction = (transaction, id) => async (
    dispatch,
    getState
) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });
    const updatedTransaction = await transactionService.updateTransaction(
        transaction,
        id
    );

    if (updatedTransaction.isError) {
        dispatch(setMessage(updatedTransaction.errors.errors, "alert", true));
    } else {
        dispatch({
            type: "UPDATE_TRANSACTION",
            payload: updatedTransaction
        });
        dispatch({
            type: "SORT_TRANSACTIONS_BY_DATE"
        });
        dispatch({
            type: "UPDATE_TRANSACTIONS_FILTERS",
            walletId: getState().wallets.currentWallet.id
        });
    }
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

// DELETE Transaction
export const deleteTransaction = id => async (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const deletedTransaction = await transactionService.deleteTransaction(id);
    if (deletedTransaction.isError) {
        dispatch(setMessage(deletedTransaction.errors.errors, "toast", true));
    } else {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        });
        dispatch({
            type: "UPDATE_TRANSACTIONS_FILTERS",
            walletId: getState().wallets.currentWallet.id
        });
    }
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

export const removeTransactions = () => dispatch => {
    dispatch({
        type: "REMOVE_TRANSACTIONS"
    });
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });
};

export const setDateRange = dateRange => dispatch => {
    dispatch({
        type: "SET_DATE_RANGE",
        payload: dateRange
    });
};

export const setCategories = categories => dispatch => {
    dispatch({
        type: "SET_CATEGORIES",
        payload: categories.map(option => option.value)
    });
};

export const setMoneyRange = moneyRange => dispatch => {
    dispatch({
        type: "SET_MONEY_RANGE",
        payload: moneyRange
    });
};

export const setSearch = search => dispatch => {
    dispatch({
        type: "SET_SEARCH",
        payload: search
    });
};
