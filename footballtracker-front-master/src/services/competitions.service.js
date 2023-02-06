import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL;

class CompetitionService {
    getAllCompetitions() {
        return axios
            .get(API_URL + 'competitions')
            .then(response => {
                return response.data;
            });
    }

    getMatchesByCompetition(competitionId) {
        return axios
            .get(API_URL + 'competitions/' + competitionId + '/matches')
            .then(response => {
                return response.data;
            });
    }

    userFollowCompetition(userId, competitionId) {
        const token = authService.getToken();
        const request = {
            method: 'post',
            url: API_URL + "users/" + userId + "/competitions",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                competitionId
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            })
    }

    userUnFollowCompetition(userId, competitionId) {
        const token = authService.getToken();
        const request = {
            method: 'delete',
            url: API_URL + "users/" + userId + "/competitions",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                competitionId
            }
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            })
    }


    getUserCompetitions(userId) {
        const token = authService.getToken();
        const request = {
            method: 'get',
            url: API_URL + "users/" + userId + "/competitions",
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

export default new CompetitionService();
