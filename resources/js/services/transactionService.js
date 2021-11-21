import { api } from "./api";

export default {
    async fetchTransactions() {
        try {
            const transactions = await api.get("transactions");
            return transactions.data;
        } catch (err) {
            return { isError: true };
        }
    },
    async createTransaction(transaction) {
        try {
            const newTransaction = await api.post(`transactions`, transaction);
            return newTransaction.data;
        } catch (err) {}
    },
    async updateTransaction({ updatedTransaction, id }) {
        try {
            await api.patch(`transactions/${id}`, updatedTransaction);
        } catch (err) {}
    },
    async deleteTransaction({ id }) {
        try {
            await api.delete(`transactions/${id}`);
        } catch (err) {}
    }
};
