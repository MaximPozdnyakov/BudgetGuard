import {
    SET_TRANSACTIONS,
    ADD_TRANSACTION,
    SET_TRANSACTION_ID,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    SET_DATE_RANGE,
    SET_CATEGORIES,
    SET_MONEY_RANGE,
    SET_SEARCH,
    REMOVE_TRANSACTIONS,
    SET_TRANSACTIONS_LOADED,
    SET_TRANSACTIONS_NOT_LOADED
} from "../constants/redux";

import transactionService from "../services/transactionService";

export const fetchTransactions = () => async (dispatch, getState) => {
    const { isUserAuthenticated } = getState().user;
    if (!isUserAuthenticated) {
        dispatch({ type: SET_TRANSACTIONS_LOADED });
        return;
    }
    dispatch({ type: SET_TRANSACTIONS_NOT_LOADED });

    const { fetchTransactions } = transactionService;
    const transactions = await fetchTransactions();
    if (transactions.isError) {
        dispatch({ type: SET_TRANSACTIONS_LOADED });
        return;
    }
    const walletId = getState().wallets.currentWallet.id;
    dispatch({ type: SET_TRANSACTIONS, payload: { transactions, walletId } });
};

export const addTransaction = newTransaction => async (dispatch, getState) => {
    const walletId = getState().wallets.currentWallet.id;
    dispatch({
        type: ADD_TRANSACTION,
        payload: { newTransaction, walletId }
    });

    const { createTransaction } = transactionService;
    const { id } = await createTransaction(newTransaction);
    dispatch({
        type: SET_TRANSACTION_ID,
        payload: { newId: id, temporaryId: newTransaction.temporaryId }
    });
};

export const updateTransaction = ({ updatedTransaction, id }) => async (
    dispatch,
    getState
) => {
    const walletId = getState().wallets.currentWallet.id;
    dispatch({
        type: UPDATE_TRANSACTION,
        payload: { updatedTransaction, walletId }
    });

    const { updateTransaction } = transactionService;
    await updateTransaction({ updatedTransaction, id });
};

export const deleteTransaction = id => async (dispatch, getState) => {
    const walletId = getState().wallets.currentWallet.id;
    dispatch({ type: DELETE_TRANSACTION, payload: { id, walletId } });

    const { deleteTransaction } = transactionService;
    await deleteTransaction({ id });
};

export const removeTransactions = () => dispatch => {
    dispatch({ type: REMOVE_TRANSACTIONS });
};

export const setDateRange = dateRange => (dispatch, getState) => {
    const walletId = getState().wallets.currentWallet.id;
    dispatch({ type: SET_DATE_RANGE, payload: { dateRange, walletId } });
};

export const setCategories = categories => dispatch => {
    dispatch({ type: SET_CATEGORIES, payload: { categories } });
};

export const setMoneyRange = moneyRange => dispatch => {
    dispatch({ type: SET_MONEY_RANGE, payload: { moneyRange } });
};

export const setSearch = search => dispatch => {
    dispatch({ type: SET_SEARCH, payload: { search } });
};
