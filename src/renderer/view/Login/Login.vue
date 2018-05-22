<template>
  <v-layout>
    <v-flex>
      <v-card height="100%" class="elevation-24">
        <v-card-media>
          <FSS></FSS>
          <v-container fluid fill-height style="position: absolute">
            <v-layout column align-center justify-center>
              <h1 class="white--text">Apollo VC</h1>
              <p class="grey--text">powered by Yealink</p>
            </v-layout>
          </v-container>
        </v-card-media>

        <v-card-text class="mt-2">
          <v-layout align-center justify-center>
            <v-flex xs10 sm9 md8 lg7>
              <component :is="currentType"></component>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-layout column justify-center align-center>
            <v-btn block color="primary" :loading="loading" @click.stop="submit">
              Login
            </v-btn>
            <v-btn block flat color="grey darken-1" @click.stop="index++">
              {{nextType}}
            </v-btn>
          </v-layout>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FSS from '../../component/FSS/FSS';
import Account from './Account';
import Phone from './Phone';

export default {
  name       : 'Login',
  components : {
    FSS,
    Account,
    Phone
  },
  data : () => ({
    loading : false,
    types   : [
      'Account', 'Phone'
    ],
    index : 0
  }),
  computed : {
    currentType() {
      if (this.index > this.types.length -1) {
        this.index = 0;
      }

      return this.types[this.index];
    },
    nextType() {

      let nextIndex = this.index + 1;

      if (nextIndex > this.types.length -1) {
        nextIndex = 0;
      }

      return this.types[nextIndex];
    }
  },
  props : {

  },
  methods : {
    submit() {
      this.loading = !this.loading;
      setTimeout(() => (this.loading = false), 3000);
      this.$router.push({ path: '/home' });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>