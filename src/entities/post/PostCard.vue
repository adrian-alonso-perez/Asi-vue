<template>
  <v-card style="background-color:lightgray">
    <v-card-title>
      <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
        <span @click="navigate" @keypress.enter="navigate" class="pointer">{{ post.title }}</span>
      </router-link>
      <v-spacer />
      <router-link :to="{ name: 'UserPosts', params: { id: post.id } }" custom v-slot="{ navigate }">
        <span @click="navigate" @keypress.enter="navigate" class="pointer"> by {{ post.author.login }}</span>
      </router-link>
    </v-card-title>
    <v-card-subtitle primary-title calss="justify-center"> Fecha de publicación: {{ date | moment }} </v-card-subtitle>

    <v-card-text v-if="post.tags.length > 0">
      Tags: <span class="tags">{{ tagsAsString(post.tags) }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "PostCard",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  methods: {
    tagsAsString(tags) {
      return tags.map((t) => t.name).join(", ");
    },
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}
</style>
