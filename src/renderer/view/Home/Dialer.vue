<template>
  <v-container fluid fill-height px-0 py-0>
    <v-layout column>
      <v-flex class="ma-1">
        <v-text-field autofocus solo clearable label="Number"></v-text-field>
      </v-flex>

      <v-flex>
        <v-container fluid grid-list-sm>
          <v-layout row wrap class="mx-4">
            <v-flex xs4 v-for="n in dial_panel" :key="n">
              <v-layout justify-center>
                <v-btn icon large color="grey lighten-3">{{n}}</v-btn>
              </v-layout>
            </v-flex>
            <v-layout row justify-center>
              <v-btn round flat outline color="light-blue">
                <v-icon left dark>videocam</v-icon>
                Video
              </v-btn>
              <v-btn round flat outline color="light-blue">
                <v-icon left dark>call</v-icon>
                Audio
              </v-btn>
            </v-layout>
          </v-layout>
        </v-container>
      </v-flex>    

      <v-divider></v-divider>

      <v-flex fill-height style="overflow-y: auto;">
        <v-list two-line subheader>
          <v-subheader>Recent</v-subheader>

          <v-list-tile v-for="call in history" :key="call.title" avatar ripple>

            <v-list-tile-avatar>
              <v-icon>{{call.type}}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{call.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{call.subtitle}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-layout row align-center justify-center>
                <v-btn icon>
                  <v-icon>videocam</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>call</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name       : 'Dialer',
  components : {
  },
  data : () => ({
    dial_panel : [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      '*', '0', '#'
    ],
    history : [
      {
        type     : 'call',
        title    : 'Meeting',
        subtitle : '1234567'
      },
      {
        type     : 'call',
        title    : 'Meeting',
        subtitle : '1234567'
      },
      {
        type     : 'call',
        title    : 'Meeting',
        subtitle : '1234567'
      }
    ]
  }),
  props : {
    
  }
};
</script>

<style scoped>

</style>