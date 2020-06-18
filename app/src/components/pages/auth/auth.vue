<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      md="4"
      sm="8"
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Worker Manager</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Логин"
              v-model="credentials.username"
              prepend-icon="mdi-account"
              type="text"
            />

            <v-text-field
              label="Пароль"
              v-model="credentials.password"
              prepend-icon="mdi-lock"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click.native="submitAuth()">Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-snackbar :timeout="6000"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </v-row>
</template>

<script>
  import Auth from '@/components/pages/auth'

  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        loginPasswordVisible: false,
        rules: [(value) => !!value || 'Это обязательное поле'],
        credentials: {
          username: '',
          password: ''
        },
        message: ''
      }
    },
    methods: {
      submitAuth () {
        Auth.authenticate(this, this.credentials, '/')
      }
    }
  }
</script>
<style lang="scss">
  @import "./../../../assets/styles";

</style>
