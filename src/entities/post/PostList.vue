<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar">
          <v-btn :to="{ name: 'PostCreate' }" color="pink" v-if="isUser()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <h1>Blog Posts</h1>
        <div class="caption">Data fetched <span class="font-weight-bold">after</span> navigation</div>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="post in posts" :key="post.id">
        <span v-if="post.author.active">
          <PostCard :post="post"></PostCard>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "./PostCard.vue";
import PostRepository from "@/repositories/PostRepository";
import auth from "@/common/auth";

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: { PostCard },
  methods: {
    isUser() {
      return auth.isUser();
    },
  },
  async mounted() {
    this.posts = await PostRepository.findAll();
    this.posts.reverse();
  },
};
</script>
