import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL;

class UserService {
    getUserData(userId) {
        const token = authService.getToken();
        const request = {
            method: 'get',
            url: API_URL + "users/" + userId + "",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp.data;
            })
    }
    updatePasswordUser(userId, password) {
        const token = authService.getToken();
        const request = {
            method: 'patch',
            url: API_URL + "users/" + userId + "",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                password
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp.data;
            })
    }

}

export default new UserService();
