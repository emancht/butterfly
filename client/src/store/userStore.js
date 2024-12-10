import { create } from "zustand";
import axios from "axios";

const UserStore = create((set) => ({

    RegisterRequest: async (email, password) => {
        let res = await axios.post("api/register", { email, password });
        return res.data['status'] === "success";
    },

    LoginRequest: async (email, password) => {
        try {
            const res = await axios.post("/api/login", { email, password }, { withCredentials: true });
            if (res.data.status === "success") {
                set({ isAuthenticated: true });  // Update authentication state
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    },

    LogoutRequest: async () => {
        try {
            const res = await axios.get("/api/logOut", { withCredentials: true });
            set({ isAuthenticated: false });
            return res.data.status === "success";
        } catch (error) {
            console.error("Logout failed:", error);
            return false;
        }
    },
}));

export default UserStore;
