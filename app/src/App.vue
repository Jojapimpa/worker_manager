<template>
  <v-app id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-container>
      <router-view/>
    </v-container>
  </v-app>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
<style lang="scss">
  @import "./assets/styles";

  body {
    background: #eee;
  }
</style>
