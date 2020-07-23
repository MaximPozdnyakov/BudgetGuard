import { api } from "./api";

export default {
    async fetchWallets() {
        try {
            const wallets = await api.get("wallets");
            return wallets.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async createWallet(payload) {
        try {
            const newWallet = await api.post(`wallets`, payload);
            return newWallet.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    }
};
