<template>


    <div id="register-page" class="">

        <div class="register-square">
            <div class="register-tittle">
                <h2>Editar contraseña</h2>
            </div>

            <div class="d-flex justify-content-center " style="position:absolute">
                <Transition name="bounce">
                    <va-alert v-if="successMessage !== ''" color="success" class="p-2">
                        {{ successMessage }} <button type="button" @click="successMessage = ''" class="btn-close"
                            aria-label="Close"></button>
                    </va-alert>
                </Transition>

                <Transition name="bounce">
                    <va-alert v-if="errMessage !== ''" color="danger" class="p-2">
                        {{ errMessage }} <button type="button" @click="errMessage = ''" class="btn-close"
                            aria-label="Close"></button>
                    </va-alert>
                </Transition>

            </div>

            <form class="register-form" @submit.prevent="editPassword" method="POST" enctype="multipart/form-data">
                <div class="input-location">

                    <div class="input-row-location">
                        <input v-model="password" type="password" required class="input-style" placeholder="Contraseña">
                        <input v-model="passwordRepeat" type="password" required class="input-style"
                            placeholder="Repite la contraseña">
                    </div>


                </div>

                <div class="buttons-location">

                    <div>
                        <button type="submit" class="submit-button">Guardar</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.store'
import { useRoute } from 'vue-router'
import UserService from '../services/user.service'


/**
 * /user/profile VISIBILIDAD: Usuario logeado
 * Componente para cambiar la contraseña de un usuario
 */

export default {
    name: "Profile",
    data() {
        return {
            errMessage: '',
            successMessage: '',
            password: '',
            passwordRepeat: ''
        }
    },
    setup() {
        const route = useRoute();
    },
    methods: {
        async editPassword() {
            if (this.password !== this.passwordRepeat) {
                this.errMessage = "Las contraseñas no son las mismas :(";
            }
            else {
                const authService = useAuthStore();
                UserService.updatePasswordUser(authService.user.id, this.password)
                    .then(() => {
                        this.password = "";
                        this.passwordRepeat = "";
                        this.successMessage = "Contraseña actualizada correctamente";
                    })
                    .catch(() => {
                        this.errMessage = "Error al actualizar la contraseña";
                    });


            }
        }
    }

}
</script>

<style>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

#register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

#register-page .register-square {
    display: flex;
    align-items: center;
    flex-direction: column;

    border: 1px solid rgb(182, 182, 182);
    border-radius: 5px;
    width: 700px;
    height: 600px;
}

.register-square .register-tittle {
    margin-top: 70px;
    margin-bottom: 20px;
}

.register-square .register-form {
    width: 100%;
    height: 100%;
}

.register-square .register-form .input-location {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.register-square .input-style {
    padding: 12px;
    margin-bottom: 8%;
    font-size: 16px;
    max-width: 100%;
    min-width: 30%;
    border: 0px;
    border-bottom: 2px solid #b7f7d0;
    margin-right: 5%;


}

.register-square .input-style:focus {
    outline: none;
    border-bottom: 2px solid #19f370;
    transition: border 200ms ease-in;

}

.register-square .submit-button {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    border: none;
    cursor: pointer;
    padding-block: 15px;
    background-color: #ddf1e5;
    border-radius: 5px;
    min-width: 150px;
}

.register-square .submit-button:hover {
    background-color: #70eba1;
}

.register-square .submit-button:active {
    background-color: #ddf1e5;
}

.register-square .buttons-location {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
    align-items: center;

}

.buttons-location .back-button {
    color: rgb(81, 104, 139);
    font-size: 19px;
}

.buttons-location .back-button:hover {
    color: rgb(13, 63, 138);
}

.buttons-location .back-button:active {
    color: rgb(81, 104, 139);
}

.register-square .input-row-location {
    display: flex;
    justify-items: space-between;
    width: 70%;
}

.birth-date-input {
    margin-bottom: 4%;
    max-width: 100%;
    min-width: 30%;
}

.admin-input {
    display: flex;
    justify-items: flex-start;
    width: 80%;
    margin-left: 70px;
}

.invalid {
    color: red
}
</style>