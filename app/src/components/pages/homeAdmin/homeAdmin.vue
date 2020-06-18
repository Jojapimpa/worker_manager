<template>
  <div>

    <side-menu/>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >

        <v-row>
          <v-col class="text-center">

            <!---->
            <!---->
            <!---->
            <!---->
            <div>
              <v-data-table
                :headers="users_headers"
                :items="users"
                :items-per-page="10"
                class="elevation-1">
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Сотрудники кадрового отдела</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical/>
                    <v-spacer/>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="credentials={}"
                        >Добавить
                        </v-btn>
                      </template>
                    </v-dialog>
                  </v-toolbar>
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Профиль работника</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field label="Фамилия Имя Отчество"
                                            v-model="credentials.fio"
                                            :rules="rules.basic"
                                            required/>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field label="Логин"
                                            v-model="credentials.username"
                                            :rules="rules.basic"
                                            required/>
                            </v-col>

                            <v-col cols="12" sm="6">
                              <v-text-field label="Пароль"
                                            v-model="credentials.password"
                                            :rules="rules.basic"
                                            type="password"
                                            required/>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field label="Email"
                                            v-model="credentials.email"
                                            :rules="rules.email"
                                            type="email"
                                            required/>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field label="Телефон"
                                            v-model="credentials.phone"
                                            :rules="rules.phone"
                                            required>
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>* обязятельно</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
                        <v-btn color="blue darken-1" text @click="updateSecretary(credentials)">Сохранить</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:item.table_actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editSecretary(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteSecretary(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <h3>Кажется у вас нет сотрудников кадрового отдела</h3>
                </template>
              </v-data-table>
            </div>

            <v-snackbar :timeout="6000"
                        bottom="bottom"
                        color="red lighten-1"
                        v-model="snackbar">
              {{ message }}
            </v-snackbar>
            <!---->
            <!---->
            <!---->
            <!---->
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <main-footer/>

  </div>
</template>

<script>
  import homeAdmin from '@/components/pages/homeAdmin'
  import SideMenu from '@/components/sideMenu/sideMenu'
  import { EventBus as SideMenuEventBus } from '@/components/sideMenu'
  import MainFooter from '@/components/mainFooter'

  export default {
    components: {MainFooter, SideMenu},
    data () {
      return {
        drawer: false,
        dialog: false,
        snackbar: false,
        addNewVisible: false,
        users: [],
        users_headers: [
          {text: 'ФИО', value: 'fio'},
          {text: 'Телефон', value: 'phone'},
          {text: 'Email', value: 'email'},
          { text: 'Действия', value: 'table_actions', sotable: false }
        ],
        rules: {
          basic: [(value) => !!(`${value}`.trim()) || 'Это обязательное поле'],
          phone: [(value) => !!`${value}`.match(/7\d{10}/) || 'Неверный формат'],
          number: [(value) => !!`${value}`.match(/^[0-9]*$/) || 'Неверный формат'],
          email: [(value) => !!`${value}`.match(/\S+@\S+\.\S+/) || 'Неверный формат']
        },
        credentials: {
          fio: '',
          username: '',
          password: '',
          phone: '',
          email: ''
        },
        message: ''
      }
    },
    mounted () {
      this.getList()

      SideMenuEventBus.$on('header-search', this.search)
    },

    methods: {
      getList () {
        homeAdmin.getList(this)
      },
      editSecretary (secretary) {
        homeAdmin.edit(this, secretary)
      },
      updateSecretary (secretary) {
        homeAdmin.update(this, secretary)
      },
      deleteSecretary (secretary) {
        homeAdmin.delete(this, secretary)
      },
      search (string) {
        homeAdmin.search(this, string)
      }
    }
  }
</script>
