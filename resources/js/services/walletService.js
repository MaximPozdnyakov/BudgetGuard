import { api } from "./api";

export default {
    async fetchWallets() {
        try {
            const wallets = await api.get("wallets");
            return wallets.data;
        } catch (err) {
            return { isError: true };
        }
    },
    async createWallet(wallet) {
        try {
            const result = await api.post(`wallets`, wallet);
            return result.data;
        } catch (err) {}
    }
};
