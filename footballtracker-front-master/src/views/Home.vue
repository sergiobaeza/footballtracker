<template>
  <div id="home-page">
    <div class="welcome-tittle">
      <h1>¡Bienvenido/a a la aplicación Football Tracker!</h1>
    </div>
    <div class="welcome-description">
      <span>
        Esta aplicacion sirve para que se puedan ver competiciones,
        partidos, equipos que participan en estos encuentros e incluso sus
        propios jugadores.
        <br>
        Tambien, si inicias sesion, podras marcar como favoritos
        competiciones y partidos para tener un mejor seguimiento de ellos.
        Por ultimo, podras ver las ultimas noticias sobre football para estar siempre al dia.
        <br>
        <br>
        <router-link to="/register" class="nav-link">Registrarse</router-link> si no lo estas o <router-link to="/login"
          class="nav-link">Iniciar Sesion</router-link>!
      </span>
    </div>
  </div>
</template>

<script>
/**
 * /home VISIBILIDAD: Publica
 * Componente encargado de mostrar el inicio de la página
 */
export default {
  name: "Home"
}
</script>

<style>
#home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#home-page .welcome-tittle {
  margin-bottom: 60px;
}

#home-page .welcome-description {
  text-align: justify;
  width: 80%;
}
</style>