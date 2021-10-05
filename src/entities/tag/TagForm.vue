<template>
  <v-container >
    <v-form ref="form" @submit.prevent="save" >
      <v-card color="grey" width="500" >
        <v-text-field v-model="tag.name" label="Tag Name" :rules="requiredField" ></v-text-field>
        <v-card-actions>
          <v-spacer />
          <v-btn color="pink" type="submit">Submit</v-btn>
          <v-btn @click="back()">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import TagRepository from "@/repositories/TagRepository";

export default {
  data() {
    return {
      tag: {},
      requiredField: [(v) => !!v || "Field is required"],
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.tag = await TagRepository.findOne(this.$route.params.id);
    } else {
      this.tag = {};
    }
  },
  methods: {
    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        const savedTag = await TagRepository.save(this.tag);
        this.$router.replace({
          name: "TagDetail",
          params: { id: savedTag.id },
        });
      } catch (err) {
        this.$notify({
          text: err.response.data.message,
          type: "error",
        });
      }
    },
    async remove() {
      await TagRepository.delete(this.tag.id);
      this.$router.replace({ name: "TagList" });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>


