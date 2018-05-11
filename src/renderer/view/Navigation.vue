<template>
  <v-layout>

    <v-btn dark color="pink" fab fixed bottom right>
      <v-icon>dialpad</v-icon>
    </v-btn>

  </v-layout>
</template>

<script>

export default {
  name : 'Navigation',
  data : () => ({
    navigation  : true,
    destination : 'meeting'
  }),
  props : {
    
  },
  methods : {
    
  }
};
</script>

<style scoped>

</style>