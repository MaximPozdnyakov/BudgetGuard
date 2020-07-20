import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const auth = axios.create({
    baseURL: "/api/auth",
    headers: {
        "Content-Type": "application/json"
    }
});
