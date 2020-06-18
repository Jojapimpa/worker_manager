<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-item @click="about = true">
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>О проекте</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="pr-6">Worker Manager</v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        v-model="search"
        @input="searchUpdated()"
      />

    </v-app-bar>

    <v-dialog v-model="about" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          О проекте
        </v-card-title>

        <v-card-text>
          <br/>
          Worker manager — разработка по заказу компании ООО "Ракета". <br/>
          Сайт для электронного кадрового учёта персонала компании.
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="about = false"
          >
            Хорошо
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { EventBus } from '@/components/sideMenu'

  export default {
    name: 'side-menu',
    data () {
      return {
        drawer: false,
        about: false,
        search: '',
        searchUpdated () {
          EventBus.$emit('header-search', this.search)
        },
        logout () {
          this.$cookie.delete('token')
          this.$cookie.delete('type')
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
