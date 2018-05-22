<template>
  <v-layout column>
    <v-flex>
      <v-toolbar color="light-blue">
        <v-toolbar-title>1105</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex fill-height style="overflow-y: auto;">
      <v-card flat tile height="100%">
        <component :is="navigation"></component>
      </v-card>
    </v-flex>
    
    <v-flex>
      <v-bottom-nav v-model="botton_nav" :active.sync="navigation">
        <v-btn flat color="light-blue" value="group">
          <span>Group</span>
          <v-icon>group</v-icon>
        </v-btn>
        <v-btn flat color="light-blue" value="event">
          <span>Event</span>
          <v-icon>event</v-icon>
        </v-btn>
        <v-btn flat color="light-blue" value="contacts">
          <span>Contacts</span>
          <v-icon>contacts</v-icon>
        </v-btn>
        <v-btn flat color="light-blue" value="dialer">
          <span>Dialer</span>
          <v-icon>dialer_sip</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-flex>
  </v-layout>
</template>

<script>
import Group from './Group';
import Event from './Event';
import Contacts from './Contacts';
import Dialer from './Dialer';

export default {
  name       : 'Home',
  components : {
    Group,
    Event,
    Contacts,    
    Dialer
  },
  data : () => ({
    botton_nav : true,
    navigation : 'dialer'
  }),
  computed : {

  },
  props : {
    
  },
  methods : {
    
  }
};
</script>

<style scoped>

</style>