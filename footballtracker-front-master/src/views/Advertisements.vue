<template>


    <div id="home-page">

        <Transition name="bounce">
            <template v-if="showPanel && authStore.user && authStore.user.isAdmin">
                <div class="d-flex p-2">
                    <form @submit.prevent="createAdvertisement" method="POST" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" v-model="anuncio.name" :required="true" class="form-control" id="name"
                                placeholder="">

                        </div>
                        <div class="form-group">
                            <label for="nombre">Descripcion</label>
                            <input type="text" v-model="anuncio.description" class="form-control" id="description"
                                placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="nombre">Brand</label>
                            <input type="text" v-model="anuncio.brand" class="form-control" id="brand" placeholder="">

                        </div>
                        <div class="form-group">
                            <label for="nombre">Img url</label>
                            <input type="text" v-model="anuncio.img_src" class="form-control" id="imgsrc"
                                placeholder="">

                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </template>
        </Transition>


        <div class="competitions-tittle">
            <h1>Anuncios</h1>
        </div>
        <va-button v-if="authStore.user && authStore.user.isAdmin" @click="showPanel = !showPanel" color="info"
            class="mr-4 mb-2">{{
                showPanel? "Cerrar panel de añadir anuncio":
                    "Abrir panel de añadir anuncio"
            }} </va-button>
        <div class="competitions-description">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Num</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(ad, index) in advertisementsStore.advertisements">
                                    <tr>
                                        <th scope="row">{{ index }}</th>
                                        <td>{{ ad.name }}</td>
                                        <td>{{ ad.description ?? "No existe ninguna descripcion" }}</td>
                                        <td>{{ ad.brand ?? "No esta asociado a ninguna marca" }}</td>
                                        <td><template v-if="ad.img_src">
                                                <img v-bind:src="ad.img_src" />
                                            </template>
                                            <template v-else>
                                                No existe una imagen asociada al anuncio
                                            </template>
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
import { useAdvertisementsStore } from "../stores/advertisements.store";

/**
 * /advertisements VISIBILIDAD: Pública
 * Componente encargado de mostrar los anuncios que existen en la web
 * En el caso de ser administrador puedes mostrar un modal donde se crean nuevos anuncios, sin ser administrador no será posible verlo
 */

export default {
    name: "Advertisements",
    data() {
        return {
            showPanel: false,
            anuncio: {
                name: "",
                description: null,
                brand: null,
                img_src: null
            }
        }
    },
    setup() {
        const advertisementsStore = useAdvertisementsStore();
        advertisementsStore.init();
        const authStore = useAuthStore();

        return {
            advertisementsStore,
            authStore
        }

    },
    methods: {
        async createAdvertisement() {
            await this.advertisementsStore.addAdvertisement(this.anuncio).then(() => {
                this.showPanel = false;
            });

        }
    }
}

</script>