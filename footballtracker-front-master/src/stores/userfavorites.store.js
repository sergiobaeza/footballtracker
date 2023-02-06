import { defineStore } from "pinia";
import { initCustomFormatter } from "vue";
import CompetitionsService from "../services/competitions.service";
import MatchesService from "../services/matches.service";

export const useUserFavoritesStore = defineStore('userFavorites', {
    state: () => ({
        competitions: [],
        matches: [],
        userId: undefined
    }),
    actions: {
        async updateCompetitions() {
            this.competitions = await CompetitionsService.getUserCompetitions(this.userId);
        },
        async followCompetition(competition) {
            await CompetitionsService.userFollowCompetition(this.userId, competition.id);
            this.competitions.push(competition);
        },
        async unfollowCompetition(competition) {
            await CompetitionsService.userUnFollowCompetition(this.userId, competition.id);
            this.competitions = this.competitions.filter((comp) => comp.id != competition.id);
        },
        async updateMatches() {
            this.matches = await MatchesService.getUserMatches(this.userId);
        },
        async followMatch(match) {
            await MatchesService.userUnFollowMatch(this.userId, match.id);
            this.matches.push(match);
        },
        async unfollowMatch(match) {
            await MatchesService.userUnFollowMatch(this.userId, match.id);
            this.matches = this.matches.filter((matc) => matc.id != match.id);
        },
        setId(id) {
            this.userId = id;
        },
        isCompetitionFollowed(competitionId) {
            return this.competitions.some((competition) => competition.id === competitionId);
        },
        isMatchFollowed(matchId) {
            return this.matches.some((match) => match.id === matchId);
        }

    },
    getters: {
    }
})