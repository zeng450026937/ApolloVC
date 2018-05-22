<template>
  <v-container fluid fill-height px-0 py-0>
    <v-layout column>
      <v-flex class="pa-2">
        <v-card color="grey lighten-5" height="300px" class="elevation-3">
          <v-card-media height="240px">
            <v-container fill-height fluid>
              <v-layout fill-height column>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Subject</span>
                  <h1>Title:  Meeting</h1>
                  <h3>Time:  20:30 ~ 31:30</h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>

          <v-card-actions>
            <v-spacer/>
            <v-btn flat color="orange">JOIN</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-spacer></v-spacer>

      <v-flex>
        <v-layout row d-flex>
          <v-spacer/>
          <v-btn depressed color="yellow darken-2">JOIN</v-btn>
          <v-spacer/>
          <v-btn depressed color="light-blue lighten-2">MEET NOW</v-btn>
          <v-spacer/>
        </v-layout>
      </v-flex>

      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name       : 'Group',
  components : {
  },
  data : () => ({
    tabs : [
      'enterprise', 'local'
    ]
  }),
  props : {
    
  }
};
</script>

<style scoped>

</style>