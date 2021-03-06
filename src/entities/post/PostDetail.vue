<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="loading" class="loading">Loading...</v-col>
      <v-col cols="8" offset="2" v-if="post">
        <v-card>
          <v-card-title>
            <span>{{ post.title }}</span>
            <v-spacer />
            <router-link :to="{ name: 'UserPosts', params: { id: post.id } }" custom v-slot="{ navigate }">
              <span @click="navigate" @keypress.enter="navigate" class="pointer"> by {{ post.author.login }}</span>
            </router-link>
          </v-card-title>
          <v-card-subtitle> {{ date | moment }} </v-card-subtitle>

          <v-card-text>
            <div>
              Tags: <span class="tags">{{ tagsAsString }}</span>
            </div>
            <v-divider />
            <div class="post">
              {{ post.body }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :to="{ name: 'PostUpdate', params: { id: post.id } }" color="pink"> Edit </v-btn>
            <v-btn @click="back()"> Back </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      post: null,
      date: new Date().toISOString().substr(0, 10),
    };
  },

  filters: {
    moment: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },

  async mounted() {
    this.loading = true;

    try {
      this.post = await PostRepository.findOne(this.$route.params.id);
    } catch (e) {
      this.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => this.back(), 2000);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    tagsAsString() {
      return this.post.tags.map((t) => t.name).join(", ");
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
