<template>
  <v-container class="text-center">
    <v-form ref="form" @submit.prevent="save">
      <v-card>
        <v-card-title>
          <v-text-field v-model="post.title" label="Title" :counter="50"></v-text-field>
          <v-select v-model="post.author" :items="users" item-text="login" return-object label="Author" :rules="requiredField"></v-select>
        </v-card-title>
        <v-card-text>
          <v-select v-model="post.tags" :items="tags" item-text="name" label="Tags" return-object multiple></v-select>

          <v-textarea v-model="post.body" label="Body" rows="7" :counter="300" :rules="requiredField" ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="pink" type="submit">Submit</v-btn>
          <v-btn color="warning" @click="remove()" v-if="post.id">Remove</v-btn>
          <v-btn @click="back()">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import UserRepository from "@/repositories/UserRepository";
import TagRepository from "@/repositories/TagRepository";

export default {
  data() {
    return {
      post: {},
      users: [],
      tags: [],
      requiredField: [(v) => !!v || "Field is required"],
    };
  },
  async created() {
    this.users = await UserRepository.findAll();
    this.tags = await TagRepository.findAll();

    if (this.$route.params.id) {
      this.post = await PostRepository.findOne(this.$route.params.id);
    } else {
      this.post = {};
    }
  },
  methods: {
    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (this.post.title == null) {
        this.post.title=this.post.body.slice(0,47);
        if ( (this.post.body).length > 47){
          this.post.title=(this.post.title + '...');
        }
      }
      try {
        const savedPost = await PostRepository.save(this.post);
        this.$router.replace({
          name: "PostDetail",
          params: { id: savedPost.id },
        });
      } catch (err) {
        this.$notify({
          text: err.response.data.message,
          type: "error",
        });
      }
    },
    async remove() {
      await PostRepository.delete(this.post.id);
      this.$router.replace({ name: "PostList" });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
