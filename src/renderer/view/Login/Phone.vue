<template>
  <v-form>
    <v-text-field autofocus required clearable prepend-icon="person" name="login" label="Phone" type="text"></v-text-field>
    <v-text-field clearable required prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
  </v-form>
</template>

<script>

export default {
  name : 'PhoneLogin',
  data : () => ({

  }),
  props : {
    
  }
};
</script>

<style scoped>

</style>