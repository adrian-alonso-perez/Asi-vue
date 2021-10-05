<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar"></div>
        <h1>Users</h1>
        <div class="caption">Data fetched <span class="font-weight-bold">after</span> navigation</div>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="user in users" :key="user.id">
        <UserCard :user="user"></UserCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserCard from "./UserCard.vue";
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      users: [],
    };
  },
  components: { UserCard },
  async mounted() {
    this.users = await UserRepository.findAll();
  },
};
</script>
