
<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md main-navbar">
        <div class="container-fluid">
          <router-link to="/home" class="navbar-brand"><img class="logo-image" src="./assets/logo.jpg"></router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item text-underline">
                <router-link to="/matches" class="nav-link">Partidos</router-link>
              </li>
              <li class="nav-item text-underline">
                <router-link to="/competitions" class="nav-link">Competiciones</router-link>
              </li>
              <li class="nav-item text-underline">
                <router-link to="/advertisements" class="nav-link">Anuncios</router-link>
              </li>
            </ul>
            <div class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li v-if="!authStore.status.loggedIn" class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Acceso
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li class="dropdown-item text-underline">
                      <router-link to="/login" class="nav-link">Iniciar Sesion</router-link>
                    </li>
                    <li class="dropdown-item text-underline">
                      <router-link to="/register" class="nav-link">Registrarse</router-link>
                    </li>
                  </ul>
                </li>
                <li v-if="authStore.user" class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ authStore.user.username }}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li class="dropdown-item text-underline">
                      <router-link to="/user/profile" class="nav-link">Mi perfil</router-link>
                    </li>
                    <li class="dropdown-item text-underline">
                      <router-link to="/user/competitions" class="nav-link">Mis competiciones</router-link>
                    </li>
                    <li class="dropdown-item text-underline">
                      <router-link to="/user/matches" class="nav-link">Mis partidos</router-link>
                    </li>
                    <li class="dropdown-item text-underline">
                      <a class="nav-link" @click="logout">Cerrar Sesión</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <router-view />

    <footer>
      <div class="main-footer">
        <span>@2023 Aplicación Football Tracker</span>
        <div class="authors">
          <span>Álvaro Pastor</span>
          <span>Sergio Baeza</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from './stores/auth.store';

export default {
  name: 'app',

  setup() {
    const authStore = useAuthStore();

    return {
      authStore
    }

  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push({ name: "Home" })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:400,600');

#app {
  min-height: 100vh;
  position: relative;
}

body {
  margin: 0;
  font-family: 'Work Sans', sans-serif;
  min-height: 100vh;
}

header {
  border-bottom: 1px solid rgba(34, 34, 34, 0.2);
  margin-bottom: 70px;
}

header .main-navbar {
  text-transform: uppercase;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 90px;

}

.logo-image {
  width: 100px;
  height: 100px;
}

.text-underline {
  display: inline-block;
  padding-bottom: 2px;
  background-image: linear-gradient(#000 0 0);
  background-position: 0 100%;
  /*OR bottom left*/
  background-size: 0% 2px;
  background-repeat: no-repeat;
  transition:
    background-size 0.3s,
    background-position 0s 0.3s;
  /*change after the size immediately*/
}

.text-underline:hover {
  background-position: 100% 100%;
  /*OR bottom right*/
  background-size: 100% 2px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  border-top: 1px solid rgba(34, 34, 34, 0.2);
}

footer .main-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 100px;
  height: 100%;
}

footer .authors {
  display: flex;
  flex-direction: column;
}

.dropdown-item:active {
  background: none !important;
}
</style>