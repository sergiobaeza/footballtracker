<template>
    <div id="home-page">
        <div class="competitions-tittle">
            <h1>Competiciones</h1>
        </div>
        <va-input class="mb-2" v-model="competitions.filter" placeholder="Busca por nombre" />
        <div class="competitions-description">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Pais</th>
                                    <th scope="col">Fecha de inicio</th>
                                    <th scope="col">Fecha de finalizacion</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="competition in competitions.getCompetitions">
                                    <tr>
                                        <th scope="row">{{ competition.id }}</th>
                                        <td>{{ competition.name }}</td>
                                        <td>{{ competition.country }}</td>
                                        <td>{{ competition.startDate }}</td>
                                        <td>{{ competition.endDate }}</td>
                                        <td>

                                            <router-link v-bind:to="'/competitions/' + competition.id">
                                                <va-button color="success" class="mr-4 mb-2">Ver partidos</va-button>
                                            </router-link>
                                            <va-button
                                                v-if="authStore.user && !userFavorites.isCompetitionFollowed(competition.id)"
                                                @click="followCompetition(competition)" color="info"
                                                class="mr-4 mb-2">Seguir
                                            </va-button>

                                            <va-button
                                                v-if="authStore.user && userFavorites.isCompetitionFollowed(competition.id)"
                                                @click="unfollowCompetition(competition)" color="danger"
                                                class="mr-4 mb-2">Dejar de seguir
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
    </div>
</template>


<style>
#home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#home-page .competitions-tittle {
    margin-bottom: 60px;
}

#home-page .competitions-description {
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
import { useCompetitionsStore } from "../stores/competitions.store";
import { useUserFavoritesStore } from "../stores/userfavorites.store";

/**
 * /competitions/ VISIBILIDAD: Pública
 * Componente encargado de todas las competiciones
 * Para usuarios logeados permitirá seguir o dejar de seguir una competición
 */

export default {
    name: "Competitions",
    setup() {
        const competitions = useCompetitionsStore()
        competitions.init();
        competitions.filter = ""

        const authStore = useAuthStore();
        const userFavorites = useUserFavoritesStore();
        if (authStore.user) {
            userFavorites.setId(authStore.user.id);
        }

        return {
            competitions,
            authStore,
            userFavorites
        }

    },
    methods: {
        followCompetition(competition) {
            this.userFavorites.followCompetition(competition);
        },
        unfollowCompetition(competition) {
            this.userFavorites.unfollowCompetition(competition);
        }
    }
}

</script>