import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL;

class AdvertisementsService {
    getAllAdvertisements() {
        return axios
            .get(API_URL + 'advertisements')
            .then(response => {
                return response.data;
            });
    }
    addAdvertisement(advertisement) {
        const token = authService.getToken();
        const request = {
            method: 'post',
            url: API_URL + "advertisements",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: advertisement
        }

        return axios(request)
            .then(function (resp) {
                return resp;
            })
    }
}

export default new AdvertisementsService();
