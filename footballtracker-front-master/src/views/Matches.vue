<template>

    <va-modal v-model="matches.showModal" title="Información del partido">
        <b>Id: </b>{{ matches.matchInfo.id }}<br />
        <b>Equipo Local: </b>
        <div style="padding: 5%">
            <b>Nombre: </b>{{ matches.matchInfo.localTeam.name }} <br />
            <b>Estadio: </b>{{ matches.matchInfo.localTeam.stadiumName }}<br />
            <b>Localizacion: </b>{{
                matches.matchInfo.localTeam.city + ", " + matches.matchInfo.localTeam.country
            }}<br />
            <b>Año de fundacion: </b>{{ matches.matchInfo.localTeam.foundationYear }} <br />
        </div>

        <b>Equipo Visitante: </b>
        <div style="padding: 5%">
            <b>Nombre: </b>{{ matches.matchInfo.awayTeam.name }} <br />
            <b>Estadio: </b>{{ matches.matchInfo.awayTeam.stadiumName }}<br />
            <b>Localizacion: </b>{{
                matches.matchInfo.awayTeam.city + ", " + matches.matchInfo.awayTeam.country
            }}<br />
            <b>Año de fundacion: </b>{{ matches.matchInfo.awayTeam.foundationYear }} <br />
        </div>

        <b>Competicion: </b>
        <div style="padding: 5%">
            <b>Nombre: </b>{{ matches.matchInfo.competition.name }} <br />
            <b>Inicio: </b>{{ matches.matchInfo.competition.startDate }} <br />
            <b>Fin: </b>{{ matches.matchInfo.competition.endDate }} <br />
            <b>Pais: </b>{{ matches.matchInfo.competition.country }} <br />

        </div>

    </va-modal>
    <div id="home-page">
        <div class="matches-title">
            <h1>Partidos</h1>
        </div>

        <div class="matches-description">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Competicion</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Local</th>
                                    <th scope="col">Visitante</th>
                                    <th scope="col">Resultado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="match in (matches.matches)">
                                    <tr>
                                        <th scope="row">{{ match.id }}</th>
                                        <td>{{ match.competition.name }}</td>

                                        <td>{{ match.date }}</td>
                                        <td>{{ match.localTeam.name }}</td>
                                        <td>{{ match.awayTeam.name }}</td>
                                        <td>{{
                                            match.played === true ? match.localScore + "-" + match.awayScore :
                                                "POR DEFINIR"
                                        }}</td>
                                        <td>
                                            <va-button @click="showMatchInfo(match.id)">
                                                Info Equipos
                                            </va-button>
                                            <va-button v-if="authStore.user && !userFavorites.isMatchFollowed(match.id)"
                                                @click="followMatch(match)" color="info" class="mr-4 mb-2">Seguir
                                            </va-button>

                                            <va-button v-if="authStore.user && userFavorites.isMatchFollowed(match.id)"
                                                @click="unfollowMatch(match)" color="danger" class="mr-4 mb-2">Dejar
                                                de
                                                seguir
                                            </va-button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <template v-if="matches.resultsPerPage !== undefined" v-for="n in matches.numberOfPages">
                    <li v-if="(n - 1) == matches.actualPage" class="page-item active">
                        <a class="page-link" href="#">{{ n }}</a>
                    </li>
                    <li v-else class="page-item"><a class="page-link" v-on:click="matches.goToPage(n - 1)">{{
                        n
                    }}</a>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>


<style>
#home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#home-page .matches-title {
    margin-bottom: 60px;
}

#home-page .matches-description {
    text-align: justify;
    width: 80%;
}

.container {
    padding: 2rem 0rem;
}

h4 {
    margin: 2rem 0rem 1rem;
}
</style>


<script>
import { useMatchesStore } from "../stores/matches.store";
import { useAuthStore } from "../stores/auth.store";
import { useUserFavoritesStore } from "../stores/userfavorites.store";


/**
 * /matches VISIBILIDAD: Usuario publico
 * Componente encargado de mostrar los partidos que existen
 * Si el usuario esta logeado podra añadir a seguimiento o quitar un partido
 */

export default {
    name: "Matches",
    setup() {
        const matches = useMatchesStore()
        matches.initPaginatedBy(1)

        const authStore = useAuthStore();
        const userFavorites = useUserFavoritesStore();
        if (authStore.user) {
            userFavorites.setId(authStore.user.id);
        }


        return {
            authStore,
            userFavorites,
            matches
        }

    },
    methods: {
        showMatchInfo: function (matchId) {
            this.matches.showModal = true;
            const index = this.matches.matches.findIndex(obj => obj.id == matchId);
            this.matches.setMatchInfo(this.matches.matches[index]);
        },
        followMatch(match) {
            this.userFavorites.followMatch(match);
        },
        unfollowMatch(match) {
            this.userFavorites.unfollowMatch(match);
        }
    }
}

</script>