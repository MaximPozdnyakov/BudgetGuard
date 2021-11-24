import { auth, api, createAxiosWithToken } from "./api";

export default {
    async register(credentials) {
        try {
            const newUser = await auth.post("registration", credentials);
            return newUser.data;
        } catch (err) {
            return { isError: true, errors: err.response.data.errors };
        }
    },
    async login(credentials) {
        try {
            const user = await auth.post(`login`, credentials);
            return user.data;
        } catch (err) {
            return { isError: true };
        }
    },
    async logout() {
        try {
            await createAxiosWithToken().post(`logout`);
        } catch (err) {}
    },
    async fetchUser() {
        try {
            const user = await createAxiosWithToken().post(`me`);
            return user.data;
        } catch (err) {
            return { isError: true };
        }
    },
    async fetchGoogleUser() {
        try {
            const user = await api.get("google/me");
            return user.data;
        } catch (err) {
            return { isError: true };
        }
    },
    async logoutGoogle() {
        try {
            await api.get("google/logout");
        } catch (err) {}
    }
};
