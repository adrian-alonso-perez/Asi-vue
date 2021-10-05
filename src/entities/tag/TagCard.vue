<template>
  <v-card style="background-color:lightgray">
    <v-card-title>
      <router-link :to="{ name: 'TagDetail', params: { id: tag.id } }" custom v-slot="{ navigate }">
        <span @click="navigate" @keypress.enter="navigate" class="pointer">{{ tag.name }}</span>
      </router-link>
      <v-spacer />
    </v-card-title>
    <v-btn :to="{ name: 'TagUpdate', params: { id: tag.id } }" class="ma-2" outlined large fab color="indigo" v-if="isAdmin()">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>  

  </v-card>
</template>

<script>
import auth from "@/common/auth";

export default {
  name: "TagCard",
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },

  methods: {
    isAdmin() {
      return auth.isAdmin();
    },
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}
</style>
