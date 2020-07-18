import { api } from "./api";

export default {
    async fetchTransactions() {
        try {
            const transactions = await api.get("transactions/");
            return transactions.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async createTransaction(payload) {
        try {
            const newTransaction = await api.post(`transactions/`, payload);
            return newTransaction.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async updatePost(payload, transactionId) {
        try {
            const updatedTransaction = await api.patch(
                `transactions/${transactionId}/`,
                payload
            );
            return updatedTransaction.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async deleteTransaction(transactionId) {
        try {
            const deletedTransaction = await api.delete(
                `transactions/${transactionId}/`
            );
            return deletedTransaction;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    }
};
