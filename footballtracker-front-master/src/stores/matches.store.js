import { defineStore } from "pinia";
import { initCustomFormatter } from "vue";
import CompetitionsService from "../services/competitions.service";
import MatchesService from "../services/matches.service";

export const useMatchesStore = defineStore('matches', {
    state: () => ({
        matches: [],
        matchInfo: undefined,
        showModal: false,
        total: 0,
        resultsPerPage: undefined,
        actualPage: undefined,
        numberOfPages: 0
    }),
    actions: {
        async init() {
            this.matches = await MatchesService.getAllMatches();
        },
        async initPaginatedBy(resultsPerPage) {
            this.resultsPerPage = resultsPerPage;
            const result = await MatchesService.getPaginationMatches(0, resultsPerPage);
            this.matches = result.results;
            this.total = result.total;
            this.actualPage = 0;

            if (this.resultsPerPage >= this.total) this.numberOfPages = 1;
            else this.numberOfPages = (this.total % this.resultsPerPage == 0 ? (this.total / this.resultsPerPage) : parseInt(this.total / this.resultsPerPage) + 1)
        },
        async goToPage(pageNumber) {
            const offset = pageNumber * this.resultsPerPage;
            const result = await MatchesService.getPaginationMatches(offset, this.resultsPerPage);
            this.matches = result.results;
            this.total = result.total;
            this.actualPage = pageNumber;
        },

        async getMatchesByCompetition(id) {
            this.matches = await CompetitionsService.getMatchesByCompetition(id);
            this.showModal = false;
            this.matchInfo = undefined;
        },
        setMatchInfo(match) {
            this.matchInfo = match;
        }
    },
})