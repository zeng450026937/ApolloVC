<template>
  <v-form>
    <v-text-field autofocus clearable required prepend-icon="person" name="login" label="Account" type="text"></v-text-field>
    <v-text-field clearable required prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
  </v-form>
</template>

<script>

export default {
  name : 'AccountLogin',
  data : () => ({

  }),
  props : {
    
  }
};
</script>

<style scoped>

</style>