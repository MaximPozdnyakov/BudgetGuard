import transactionService from "../services/transactionService";

// GET Transactions
export const getTransactions = () => async (dispatch, getState) => {
    const transactions = await transactionService.fetchTransactions();
    dispatch({
        type: "GET_TRANSACTIONS",
        payload: transactions
    });
    return transactions;
};

// ADD Transaction
export const addTransaction = transaction => async (dispatch, getState) => {
    dispatch({
        type: "TRANSACTION_NOT_LOADED"
    });

    const newTransaction = await transactionService.createTransactions(transaction);
    dispatch({
        type: "ADD_TRANSACTION",
        payload: newTransaction
    });
    return newTransaction;
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
    return updatedTransaction;
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
    return deletedTransaction;
};
