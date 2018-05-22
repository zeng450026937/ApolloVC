<template>
  <v-app>
    <v-system-bar app status color="light-blue" class="px-0 dragable" v-if="systembar">
      <v-subheader>Apollo VC</v-subheader>
      <v-spacer></v-spacer>
      <v-toolbar-items class="no-dragable">
        <v-btn flat style="min-width: 0"><v-icon small class="mx-0">remove</v-icon></v-btn>
        <v-btn flat style="min-width: 0"><v-icon small class="mx-0">check_box_outline_blank</v-icon></v-btn>
        <v-btn depressed style="min-width: 0" color="red lighten-1"><v-icon small class="mx-0">close</v-icon></v-btn>
      </v-toolbar-items>
    </v-system-bar>

    <v-navigation-drawer app disable-resize-watcher v-model="drawer"></v-navigation-drawer>

    <v-toolbar app dark color="primary" style="-webkit-app-region: drag" v-if="toolbar">
      <v-toolbar-side-icon style="-webkit-app-region: no-drag" @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Apollo VC</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon style="-webkit-app-region: no-drag">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content style="position: fixed; width:100%; height: 100%; z-index: 1;">
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
    systembar : true,
    drawer    : false,
    toolbar   : false,
    footer    : false
  })
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}

.dragable {
  -webkit-app-region: drag;
}
.no-dragable {
  -webkit-app-region: no-drag;
}
.no-user-select {
  -webkit-user-select: none;
}
.background {
  background-color: #03A9F4;
  // background: linear-gradient(to top right, rgba(137, 143, 182, 0.5), rgba(35, 45, 100, 0.5)), url('../resource/vbanner.jpg');
}
</style>