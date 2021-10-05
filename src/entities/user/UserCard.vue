<template>
  <v-card style="background-color:lightgray">
    <v-card-title>
      <span> {{ user.login }}</span>

      <v-spacer />
      <!--<span>by {{ post.author.login }}</span> -->
    </v-card-title>

    <v-card-actions>
      <v-spacer />
      <v-btn color="red" v-if="isAdmin() && user.id" @click="remove()">Remove</v-btn>
      <v-btn color="green" v-if="!user.active" @click="activate()">Activate</v-btn>
      <v-btn color="warning" v-if="user.active" @click="deactivate()">Deactivate</v-btn>
    </v-card-actions>
    <!-- <v-card-subtitle> {{ post.timestamp }} </v-card-subtitle> -->
  </v-card>
</template>

<script>
import auth from "@/common/auth";
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isAdmin() {
      return auth.isAdmin();
    },
    async remove() {
      await UserRepository.delete(this.user.id);
      // Volvemos al menu principal al borrar un usuario.
      this.$router.push({ name: "Home" });
    },
    async activate() {
      await UserRepository.activate(this.user.id);
      this.$router.push({ name: "Home" });
    },
    async deactivate() {
      await UserRepository.deactivate(this.user.id);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
