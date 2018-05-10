<template>
  <v-app>
    <v-navigation-drawer app disable-resize-watcher v-model="drawer"></v-navigation-drawer>
    <v-toolbar app dark color="primary" v-if="toolbar">
      <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Apollo VC</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height px-0 py-0 class="background">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app v-if="footer"></v-footer>
  </v-app>
</template>

<script>
export default {
  name : 'App',
  data : () => ({
    drawer  : false,
    toolbar : false,
    footer  : false
  })
};
</script>

<style lang="scss">
html {
  overflow-y: auto
}

.background {
  background: linear-gradient(to top right, rgba(137, 143, 182, 0.5), rgba(35, 45, 100, 0.5)), url('../resource/vbanner.jpg');
}
</style>