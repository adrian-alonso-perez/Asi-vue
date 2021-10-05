<template>
  <v-container>
    <v-col cols="12" class="text-center">
      <h1>Post related with <span> {{nombre}} </span>

      </h1>
      <v-divider class="text"></v-divider>
    </v-col>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="6" lg="3" v-for="post in filteredPosts" :key="post.id">
        <PostCard :post="post"></PostCard>
        <v-divider class="text"></v-divider>
      </v-col>
    </v-row>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="6" lg="3" align="center" justify="space-around">
        <v-card-actions>
          <v-btn elevation="17" class="mdi" light center color="primary" @click="back()">
            <v-icon color="white" dark> mdi-arrow-left-thick </v-icon>
            Back
          </v-btn>
          <v-btn color="red" @click="remove()">Delete Tag</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TagRepository from "@/repositories/TagRepository";
import PostRepository from "@/repositories/PostRepository";
import PostCard from "@/entities/post/PostCard.vue";

export default {
  data() {
    return {
      loading: false,
      tag: {},
      posts: [],
      tags: [],
    };
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((p) => p.tags.map((t) => t.id).includes(this.tag.id));
    },
    nombre(){
      return this.tag.name;
    },
  },
  components: { PostCard },

  async mounted() {
    this.loading = true;
    try {
      this.posts = await PostRepository.findAll();
      this.posts.reverse();
      this.tags = await TagRepository.findAll();
      this.tag = await TagRepository.findOne(this.$route.params.id);
    } catch (e) {
      this.$notify({
        title: "Important message",
        text: e.response.data.message,
        type: "error",
        clean: true,
      });
      setTimeout(() => this.back(), 2000);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async remove() {
      await TagRepository.delete(this.tag.id);
      this.$router.replace({ name: "TagList" });
    },
  },
};
</script>
