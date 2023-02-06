import { defineStore } from "pinia";
import { initCustomFormatter } from "vue";
import AdvertisementsService from "../services/advertisements.service";

export const useAdvertisementsStore = defineStore('advertisements', {
    state: () => ({
        advertisements: []
    }),
    actions: {
        async init() {
            this.advertisements = await AdvertisementsService.getAllAdvertisements();
        },
        async addAdvertisement(advertisement) {
            AdvertisementsService.addAdvertisement(advertisement).then(() => {
                this.advertisements.push(advertisement);
            });

        }
    },
})