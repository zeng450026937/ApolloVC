<template>
  <v-container fluid fill-height px-0 py-0>
    <v-layout>
      <v-flex>
        <v-tabs centered grow>
          <v-tab v-for="tab in tabs" :key="tab">
            {{tab}}
          </v-tab>
          <v-tab-item v-for="tab in tabs" :key="tab">
            <v-card flat width="100%" height="100%">
              <v-card-text>Contact</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name       : 'Contacts',
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