import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
    login(user) {
        const request = {
            method: 'post',
            url: API_URL + "users/login",
            headers: {
                'Content-Type': 'application/json',
            },
            data: user
        }

        return axios(request)
            .then(function (resp) {
                localStorage.setItem('user', JSON.stringify(resp.data))
                return resp.data;
            })


    }

    logout() {
        localStorage.removeItem('user');
    }

    register(registerData) {
        const request = {
            method: 'post',
            url: API_URL + 'users/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: registerData
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            });
    }

    getToken() {
        const storage = JSON.parse(localStorage.getItem('user'));
        if (!storage) {
            return undefined
        }
        return storage.token;
    }

}

export default new AuthService();
