import { auth } from "./api";

export default {
    async register(credentials) {
        try {
            const newUser = await auth.post("registration", credentials);
            return newUser.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async login(credentials) {
        try {
            const user = await auth.post(`login`, credentials);
            return user.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async logout() {
        try {
            const user = await axios
                .create({
                    baseURL: "/api/auth",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .post(`logout`);
            return user.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    },
    async fetchUser() {
        try {
            const user = await axios
                .create({
                    baseURL: "/api/auth",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .post(`me`);
            return user.data;
        } catch (err) {
            return {
                isError: true,
                errors: err.response.data
            };
        }
    }
};
