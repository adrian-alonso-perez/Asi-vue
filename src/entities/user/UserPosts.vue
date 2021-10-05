<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="loading" class="loading">Loading...</v-col>
      <v-col cols="8" offset="2" v-if="post">
        <v-col cols="12" class="text-center">
          <div>
            <h1>
            Posts of  <span>{{ post.author.login }}</span>
            <v-spacer />
            </h1>
          </div>
          <v-row class="justify-center allign-center">
            <v-col cols="12" sm="6" lg="3" v-for="(post, itemObjKey) in filteredPosts" :key="post.id">
              <li style="display: none">this index: {{ itemObjKey + 1 }}</li>
              <PostCard :post="post"></PostCard>
            </v-col>
          </v-row>
          <v-col class="text-center">
            <div :style="{color: ' #f67e7e'}">
            <v-text>Number of Posts: {{ filteredPosts.length }}</v-text>
            </div>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import PostCard from "@/entities/post/PostCard.vue";

export default {
  data() {
    return {
      loading: false,
      post: null,
      user: null,
      posts: [],
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((p) => p.author.id == this.post.author.id);
    },
  },
  components: { PostCard },

  async mounted() {
    this.loading = true;
    try {
      this.posts = await PostRepository.findAll();
      this.post = await PostRepository.findOne(this.$route.params.id);
      this.user = this.$route.params.id;
      this.posts.reverse();
    } catch (e) {
      this.$notify({
        title: "Important message",
        text: e.response.data.message,
        type: "error",
        clean: true,
      });
      //setTimeout(() => this.back(), 2000);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}
.post {
  padding: 30px 50px;
  color: rgba(0, 0, 0, 0.87);
  font-size: larger;
}

.error {
  margin-top: 40px;
}
</style>
