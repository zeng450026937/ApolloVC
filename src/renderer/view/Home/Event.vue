<template>
  <v-container fluid fill-height py-0 grid-list-md>
    <v-layout column style="overflow-y: auto;" class="pt-1">
      <v-flex xs12
        v-for="event in events"
        :key="event.title"
      >
        <v-card class="elevation-3" color="grey lighten-5">
          <v-card-media contain>
            <v-container fill-height fluid>
              <v-layout column>
                <v-flex xs12>
                  <span>{{event.title}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" style="min-width: 0px;">JOIN</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      
      <v-flex fill-height></v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name       : 'Event',
  components : {
  },
  data : () => ({
    events : [
      { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg' },
      { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg' },
      { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg' },
      { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg' },
      { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg' },
      { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg' },
      { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg' }
    ]
  }),
  props : {
    
  }
};
</script>

<style scoped>

</style>