<template>
    <div id="register-page">
        <div class="register-square">
            <div class="register-tittle">
                <h2>Registro</h2>
            </div>
            <Transition name="bounce">
                <va-alert v-if="errMessage !== ''" color="danger" class="p-2">
                    {{ errMessage }} <button type="button" @click="errMessage = ''" class="btn-close"
                        aria-label="Close"></button>
                </va-alert>
            </Transition>

            <form class="register-form" @submit.prevent="createUser" method="POST" enctype="multipart/form-data">
                <div class="input-location">
                    <div class="input-row-location">
                        <input v-model="name" type="text" required class="input-style" placeholder="Nombre">
                        <div class="birth-date-input">
                            <label style="margin-left:10px" for="birthDate">Fecha de nacimiento</label>
                            <input v-model="birthDate" id="birthDate" name="birthDate" type="date" class="input-style">
                        </div>

                    </div>
                    <div class="input-row-location">
                        <input v-model="email" type="email" required class="input-style" placeholder="Email">
                        <input v-model="password" type="password" required class="input-style" placeholder="Contraseña">
                    </div>
                    <div class="admin-input">
                        <div>
                            <input v-model="administrador" name="administrador" id="administrador" type="checkbox"
                                class="input-style">
                        </div>
                        <div style="margin-left: 5px">
                            <label for="administrador">Registrarme como administrador</label>
                        </div>

                    </div>

                </div>

                <div class="buttons-location">
                    <router-link to="/login" class="back-button">Iniciar sesión</router-link>

                    <div>
                        <button type="submit" class="submit-button">Crear cuenta</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.store'
import { useRoute } from 'vue-router'


/**
 * /register VISIBILIDAD: Publica
 * Componente encargado de mostrar y registrar a un usuario
 * Una vez el registro sea existoso se le redigirá a la página de login para que inicie sesion
 */

export default {
    name: "Register",

    data() {
        return {
            name: undefined,
            birthDate: undefined,
            email: undefined,
            password: undefined,
            administrador: false,
            errMessage: ''
        }
    },
    setup() {
        const route = useRoute();
    },
    methods: {
        async createUser() {
            const registerData = { 'email': this.email, 'password': this.password, 'birthDate': this.birthDate, 'name': this.name, 'administrador': this.administrador }
            const authStore = useAuthStore();
            authStore.register(registerData)
                .then(() => {
                    this.$router.push({ name: "Login" })
                })
                .catch((error) => {
                    this.errMessage = "Error a la hora de registrarse";
                });
        }
    }

}
</script>

<style>
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