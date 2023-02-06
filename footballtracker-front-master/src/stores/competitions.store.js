import { defineStore } from "pinia";
import { initCustomFormatter } from "vue";
import CompetitionsService from "../services/competitions.service";

export const useCompetitionsStore = defineStore('competitions', {
    state: () => ({
        competitions: [],
        filter: ""
    }),
    actions: {
        async init() {
            this.competitions = await CompetitionsService.getAllCompetitions();
        },
    },
    getters: {
        getCompetitions() {
            return this.competitions.filter((competition) => competition.name.toUpperCase().includes(this.filter.toUpperCase()));
        }
    }
})