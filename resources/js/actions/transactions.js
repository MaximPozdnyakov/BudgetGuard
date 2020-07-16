import transactionService from "../services/transactionService";

// GET Transactions
export const getTransactions = () => async (dispatch, getState) => {
    const transactions = await transactionService.fetchTransactions();
    dispatch({
        type: "GET_TRANSACTIONS",
        payload: transactions
    });
    dispatch({
        type: "SORT_TRANSACTIONS_BY_DATE"
    });
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

// ADD Transaction
export const addTransaction = transaction => async (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const newTransaction = await transactionService.createTransactions(
        transaction
    );

    dispatch({
        type: "ADD_TRANSACTION",
        payload: newTransaction
    });
    dispatch({
        type: "SORT_TRANSACTIONS_BY_DATE"
    });
    dispatch({
        type: "UPDATE_TRANSACTIONS_FILTERS"
    });
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

    const updatedTransaction = await transactionService.updateTransactions(
        transaction,
        id
    );
    dispatch({
        type: "UPDATE_TRANSACTION",
        payload: updatedTransaction
    });
    dispatch({
        type: "SORT_TRANSACTIONS_BY_DATE"
    });
    dispatch({
        type: "UPDATE_TRANSACTIONS_FILTERS"
    });
    dispatch({
        type: "TRANSACTION_LOADED"
    });
};

// DELETE Transaction
export const deleteTransaction = id => async (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const deletedTransaction = await transactionService.deleteTransactions(id);
    dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
    });
    dispatch({
        type: "UPDATE_TRANSACTIONS_FILTERS"
    });
    dispatch({
        type: "TRANSACTION_LOADED"
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
