import transactionService from "../services/transactionService";

// GET Transactions
export const getTransactions = async () => async (dispatch, getState) => {
    const transactions = transactionService.fetchTransactions();
    dispatch({
        type: "GET_TRANSACTIONS",
        payload: transactions
    });
    return transactions;
};

// ADD Transaction
export const addTransaction = async transaction => (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const newTransaction = transactionService.createTransactions(transaction);
    dispatch({
        type: "ADD_TRANSACTION",
        payload: newTransaction
    });
    return newTransaction;
};

// UPDATE Transaction
export const updateTransaction = async (transaction, id) => (
    dispatch,
    getState
) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const updatedTransaction = transactionService.updateTransactions(
        transaction,
        id
    );
    dispatch({
        type: "UPDATE_TRANSACTION",
        payload: updatedTransaction
    });
    return updatedTransaction;
};

// DELETE Transaction
export const deleteTransaction = id => (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const deletedTransaction = transactionService.deleteTransactions(id);
    dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
    });
    return deletedTransaction;
};
