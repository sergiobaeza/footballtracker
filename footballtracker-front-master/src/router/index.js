import { createWebHistory, createRouter } from "vue-router";
import { requireLogged, requireNotLogged } from "../middlewares/auth.middleware";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Competitions from "../views/Competitions.vue";
import CompetitionMatches from "../views/CompetitionMatches.vue";
import Profile from "../views/Profile.vue";
import CompetitionsFollowed from "../views/CompetitionsFollowed.vue";
import MatchesFollowed from "../views/MatchesFollowed.vue";
import Matches from "../views/Matches.vue";
import NotFound from "../views/NotFound.vue";
import Advertisements from "../views/Advertisements.vue";


const routes = [
  {
    path: "/", redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: requireNotLogged
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: requireNotLogged
  },
  {
    path: "/competitions",
    name: "Competitions",
    component: Competitions,
  },
  {
    path: "/matches",
    name: "Matches",
    component: Matches,
  },
  {
    path: "/competitions/:id",
    name: "CompetitionMatches",
    component: CompetitionMatches
  },
  {
    path: "/user/competitions",
    name: "MyCompetitions",
    component: CompetitionsFollowed,
    beforeEnter: requireLogged,
  },
  {
    path: "/user/matches",
    name: "MyMatches",
    component: MatchesFollowed,
    beforeEnter: requireLogged,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/user/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: requireLogged
  },
  {
    path: "/advertisements",
    name: "Advertisements",
    component: Advertisements
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;