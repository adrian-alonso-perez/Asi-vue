<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar">
          <v-btn :to="{ name: 'TagCreate' }" color="pink" v-if="isAdmin()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <h1>Blog Tags</h1>
        <div class="caption">Data fetched <span class="font-weight-bold">after</span> navigation</div>
      </v-col>
      
      <v-col cols="12" sm="6" lg="2" v-for="tag in tags" :key="tag.id">
        <span>
        <TagCard :tag="tag"></TagCard>
        </span>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import TagCard from "./TagCard.vue";
import TagRepository from "@/repositories/TagRepository";
import auth from "@/common/auth";

export default {
  data() {
    return {
      tags: [],
    };
  },

  components: { TagCard },
  async mounted() {
    this.tags = await TagRepository.findAll();
  },
  methods: {
    isAdmin() {
      return auth.isAdmin();
    },
  },
};
</script>
