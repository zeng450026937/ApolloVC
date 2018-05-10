<template>
  <v-layout align-center justify-center>
    <v-flex xs10 sm6 md4 lg3>
      <v-card class="elevation-24">
        <v-card-media>
          <FSS></FSS>
          <v-container fluid fill-height style="position: absolute">
            <v-layout column align-center justify-center>
              <h1 class="white--text">Apollo VC</h1>
              <p class="grey--text">powered by Yealink</p>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text>
          <v-layout justify-center>
            <v-form>
              <v-text-field clearable prepend-icon="person" name="login" label="Account" type="text"></v-text-field>
              <v-text-field clearable prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large block color="primary" 
            :loading="loading"
            @click="submit"
            >
            Login
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FSS from '../component/FSS/FSS';

export default {
  name       : 'Login',
  components : {
    FSS
  },
  data : () => ({
    loading : false
  }),
  props : {

  },
  methods : {
    submit() {
      this.loading = !this.loading;
      setTimeout(() => (this.loading = false), 3000);
      this.$router.push({ path: '/meeting' });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>