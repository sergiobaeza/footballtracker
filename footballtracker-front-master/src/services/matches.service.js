import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL;

class MatchesService {
    getAllMatches() {
        return axios
            .get(API_URL + 'matches')
            .then(response => {
                return response.data.results;
            });
    }
    getPaginationMatches(offset, limit) {
        return axios
            .get(API_URL + 'matches?offset=' + offset + "&limit=" + limit)
            .then(response => {
                return response.data;
            });
    }

    userFollowMatch(userId, matchId) {
        const token = authService.getToken();
        const request = {
            method: 'post',
            url: API_URL + "users/" + userId + "/matches",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                matchId
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            })
    }

    userUnFollowMatch(userId, matchId) {
        const token = authService.getToken();
        const request = {
            method: 'delete',
            url: API_URL + "users/" + userId + "/matches",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                matchId
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            })
    }


    getUserMatches(userId) {
        const token = authService.getToken();
        const request = {
            method: 'get',
            url: API_URL + "users/" + userId + "/matches",
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp.data;
            })
    }

}

export default new MatchesService();
