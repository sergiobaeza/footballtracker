<template>
    <div id="login-page">
        <div class="login-square">
            <div class="login-tittle">
                <h2>Iniciar sesión</h2>
            </div>
            <Transition name="bounce">
                <va-alert v-if="errMessage !== ''" color="danger" class="p-2">
                    {{ errMessage }} <button type="button" @click="errMessage = ''" class="btn-close"
                        aria-label="Close"></button>
                </va-alert>
            </Transition>

            <form class="login-form" @submit.prevent="authenticate" method="POST" enctype="multipart/form-data">
                <div class="input-location">
                    <input v-model="email" type="email" required class="input-style" placeholder="Email">
                    <input v-model="password" type="password" required class="input-style" placeholder="Contraseña">
                </div>

                <div class="buttons-location">
                    <router-link to="/register" class="back-button">Crear cuenta</router-link>

                    <div>
                        <button type="submit" class="submit-button">Acceder</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import { useAuthStore } from "../stores/auth.store";
import { useRoute } from 'vue-router'

/**
 * /login VISIBILIDAD: Publica
 * Componente encargado de realizar la autenticacion llamando al store del usuario
 */

export default {
    name: "Login",

    data() {
        return {
            email: undefined,
            password: undefined,
            errMessage: ''
        }
    },
    methods: {
        async authenticate() {
            const data = { 'email': this.email, 'password': this.password }
            this.authStore.login(data)
                .then(() => {
                    this.$router.push({ name: "Home" })
                })
                .catch((error) => {
                    this.errMessage = "Usuario o contraseña incorrectos"
                });
        }
    },
    setup() {
        const authStore = useAuthStore();
        const route = useRoute();
        if (authStore.status.loggedIn === true)
            this.$router.push({ name: "Home" })
        return {
            authStore
        }
    }

}
</script>

<style>
#login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

#login-page .login-square {
    display: flex;
    align-items: center;
    flex-direction: column;

    border: 1px solid rgb(182, 182, 182);
    border-radius: 5px;
    width: 500px;
    height: 500px;
}

.login-square .login-tittle {
    margin-top: 70px;
    margin-bottom: 20px;
}

.login-square .login-form {
    width: 100%;
    height: 100%;
}

.login-square .login-form .input-location {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.login-square .input-style {
    padding: 12px;
    margin-bottom: 8%;
    font-size: 16px;
    max-width: 60%;
    min-width: 30%;
    border: 0px;
    border-bottom: 2px solid #b7f7d0;


}

.login-square .input-style:focus {
    outline: none;
    border-bottom: 2px solid #19f370;
    transition: border 200ms ease-in;

}

.login-square .submit-button {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    border: none;
    cursor: pointer;
    padding-block: 15px;
    background-color: #ddf1e5;
    border-radius: 5px;
    min-width: 100px;
}

.login-square .submit-button:hover {
    background-color: #70eba1;
}

.login-square .submit-button:active {
    background-color: #ddf1e5;
}

.login-square .buttons-location {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
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

.invalid {
    color: red
}
</style>