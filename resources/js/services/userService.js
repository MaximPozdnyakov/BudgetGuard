import { auth, createAxiosWithToken } from "./api";

export default {
    async register(credentials) {
        try {
            const newUser = await auth.post("registration", credentials);
            return newUser.data;
        } catch (err) {
            const errors = Object.values(err.response.data.errors).map(
                arr => arr[0]
            );
            return { isError: true, errors };
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
    }
};
