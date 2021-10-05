<template>
  <v-app>
    <!-- Notificaciones usando vue-notification -->
    <notifications :max="3" :width="400" position="top center" />

    <v-app-bar app color="secondary" dark>
      <v-toolbar-title>
        <router-link to="/" v-slot="{ navigate }" custom>
          <span @click="navigate" class="pointer">Posts App</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/posts" exact text>posts</v-btn>
        <v-btn to="/tags" exact text>tags</v-btn>
        <v-btn to="/profile" exact text v-if="isLogged">profile</v-btn>
        <v-btn to="/user" exact text v-if="isAdmin()">users</v-btn>
        <v-btn active-class="hide-active" icon to="/login" v-if="!isLogged">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn active-class="hide-active" icon to="/register" v-if="!isLogged">
          <v-icon>mdi-badge-account</v-icon>
        </v-btn>
        <v-btn icon @click="logout()" v-if="isLogged">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import store from "@/common/store";
import auth from "@/common/auth";

export default {
  name: "App",
  data() {
    return {
      user: store.state.user,
    };
  },
  computed: {
    isLogged() {
      return this.user.logged;
    },
  },
  methods: {
    logout() {
      auth.logout();
      // Después de hacer logout nos vamos a home
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },

    isAdmin() {
      return auth.isAdmin();
    },
  },
};
</script>

<style lang="scss" src="./App.scss"></style>
