<template>
  <v-col align="center" justify="center">
    <v-card light class="ma-3 text-xs-center" height="200px" max-width="400"  style="background-color:lightgray">
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar size="68" color="green">
            <span class="white--text text-h5">{{ datos.login }}</span>
          </v-avatar>
          <h3>Login: {{ datos.login }}</h3>
          <p class="text-caption mt-3">
            Rol: {{ datos.authority }}
          </p>
        </div>
      </v-list-item-content>
    </v-card>
  </v-col>
</template>

<script>
import AccountRepository from "@/repositories/AccountRepository";

export default {
  data() {
    return {
      datos: "",
    };
  },
  async mounted() {
    this.datos = await AccountRepository.getAccount();
  },
};
</script>
