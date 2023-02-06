import { defineStore } from "pinia";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
    state: function () {
        return initialState;
    },
    actions: {
        async login(user) {
            try {
                const userdata = await AuthService.login(user);
                this.status.loggedIn = true;
                this.user = userdata;
                return true;
            }
            catch (error) {
                this.status.loggedIn = false;
                this.user = null;
                throw error;
            }
        },
        logout() {
            AuthService.logout();
            this.status.loggedIn = false;
            this.user = null;
        },
        async register(registerData) {
            try {
                await AuthService.register(registerData);
            }
            catch (error) {
                throw error;
            }
        }
    },


}); 