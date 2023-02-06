<template>
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
                                <template v-for="match in (userFavorites.matches)">
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
                                            <va-button color="danger" @click="unfollowMatch(match)"
                                                class="mr-4 mb-2">Dejar de seguir</va-button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
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
import { useAuthStore } from "../stores/auth.store";
import { useUserFavoritesStore } from "../stores/userfavorites.store";


/**
 * /user/matches VISIBILIDAD: Usuario logeado
 * Componente encargado de mostrar los partidos que sigue un usuario y se podrá dar de baja de ellos
 */

export default {
    name: "Matches",
    setup() {
        const userFavorites = useUserFavoritesStore()
        const authStore = useAuthStore()

        userFavorites.setId(authStore.user.id);

        userFavorites.updateCompetitions(authStore.user.id);

        return {
            userFavorites
        }


    },
    methods: {
        unfollowMatch(match) {
            this.userFavorites.unfollowMatch(match);
        }
    }
}

</script>