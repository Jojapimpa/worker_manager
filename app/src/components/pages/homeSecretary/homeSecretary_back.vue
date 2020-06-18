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
                :headers="workers_headers"
                :items="workers"
                :items-per-page="10"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Список сотрудников</v-toolbar-title>
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
                          @click="worker_edit={passport:{}}"
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
                            <v-col cols="6">
                              <v-row>
                                <v-text-field label="Фамилия Имя Отчество"
                                              v-model="worker_edit.fio"
                                              :rules="rules.basic"
                                              required/>
                              </v-row>
                              <v-row>
                                <v-text-field label="Email"
                                              v-model="worker_edit.email"
                                              :rules="rules.email"
                                              required/>
                              </v-row>
                            </v-col>
                            <v-col cols="6" align-self="center">
                              <v-row justify="center" class="pl-5">
                                <v-hover v-slot:default="{ hover }">
                                  <v-avatar color="indigo" size="130">
                                    <v-fade-transition>
                                      <label v-if="hover"
                                           class="d-flex justify-center transition-fast-in-fast-out darken-2 white--text"
                                           style="height: 100%; width: 100%"
                                      >
                                        <v-icon dark>mdi-file-upload</v-icon>
                                        <input type="file" class="d-none">
                                      </label>
                                    </v-fade-transition>
                                  </v-avatar>
                                </v-hover>
                              </v-row>

                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-row>
                                <v-text-field label="Номер паспорта"
                                              v-model="worker_edit.passport.serial"
                                              type="number"
                                              :rules="rules.number"
                                              required/>
                              </v-row>
                            </v-col>

                            <v-col cols="12" sm="6">
                              <v-row>
                                <v-text-field label="Место регистрации"
                                              v-model="worker_edit.passport.registration"
                                              :rules="rules.basic"
                                              required/>
                              </v-row>
                            </v-col>
                            <v-col cols="12">
                              <v-row>
                                <v-text-field label="Должность"
                                              v-model="worker_edit.position"
                                              :rules="rules.basic"
                                              required>
                                </v-text-field>
                              </v-row>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-row>
                                <v-text-field label="Зарплата"
                                              v-model="worker_edit.salary"
                                              type="number"
                                              required/>
                              </v-row>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-row>
                                <v-autocomplete
                                  v-model="worker_edit.status"
                                  :items="status"
                                  label="Статус"/>
                              </v-row>
                            </v-col>
                            <v-col cols="12" v-if="worker_edit._id">
                              <div class="overline">Расписание</div>
                              <v-row justify="space-around">
                                <v-checkbox label="Пн" value="1" v-model="worker_edit.workset"/>
                                <v-checkbox label="Вт" value="2" v-model="worker_edit.workset"/>
                                <v-checkbox label="Ср" value="3" v-model="worker_edit.workset"/>
                                <v-checkbox label="Чт" value="4" v-model="worker_edit.workset"/>
                                <v-checkbox label="Пт" value="5" v-model="worker_edit.workset"/>
                                <v-checkbox label="Сб" value="6" v-model="worker_edit.workset"/>
                                <v-checkbox label="Вс" value="7" v-model="worker_edit.workset"/>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>* обязятельно</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
                        <v-btn color="blue darken-1" text @click="workerUpdate(worker_edit)">Сохранить</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:item.status="{ item }">
                  <div v-if="item.status==='active'">Активен</div>
                  <div v-if="item.status==='reserved'">В резерве</div>
                  <div v-if="item.status==='dismissed'">Уволен</div>
                </template>
                <template v-slot:item.table_actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="workerEdit(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <h3>Кажется у вас нет сотрудников</h3>
                </template>
              </v-data-table>
            </div>

            <v-snackbar :timeout="6000"
                        bottom="bottom"
                        color="red lighten-1">
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
  import homeSecretary from '@/components/pages/homeSecretary'
  import SideMenu from '@/components/sideMenu/sideMenu'
  import {EventBus as SideMenuEventBus} from '@/components/sideMenu'
  import MainFooter from '@/components/mainFooter'

  export default {
    components: {MainFooter, SideMenu},
    data () {
      return {
        drawer: false,
        dialog: false,
        workers: [],
        workers_headers: [
          {
            text: 'ФИО',
            align: 'start',
            value: 'fio'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Должность',
            value: 'position'
          },

          {
            text: 'Зарплата',
            value: 'salary'
          },

          {
            text: 'Статус',
            value: 'status'
          },

          {
            text: 'Действия',
            value: 'table_actions',
            sotable: false
          }

        ],
        worker_edit: {passport: {}},
        credentials: {
          fio: '',
          passport: {
            serial: '',
            registration: ''
          },
          phone: '',
          email: '',
          status: 'active'
        },
        updateForm: {},
        message: '',
        rules: {
          basic: [(value) => !!(`${value}`.trim()) || 'Это обязательное поле'],
          phone: [(value) => !!`${value}`.match(/7\d{10}/) || 'Неверный формат'],
          number: [(value) => !!`${value}`.match(/^[0-9]*$/) || 'Неверный формат'],
          email: [(value) => !!`${value}`.match(/\S+@\S+\.\S+/) || 'Неверный формат']
        },
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        status: [{
          text: 'Активен',
          value: 'active'
        }, {
          text: 'В резерве',
          value: 'reserved'
        }, {
          text: 'Уволен',
          value: 'dismissed'
        }]
      }
    },
    mounted () {
      this.getList()

      SideMenuEventBus.$on('header-search', this.search)
    },
    methods: {
      getList () {
        homeSecretary.getList(this)
      },
      addNew () {
        homeSecretary.addNew(this)
      },
      workerEdit (worker) {
        homeSecretary.workerEdit(this, worker)
      },
      workerUpdate (worker) {
        homeSecretary.workerUpdate(this, worker)
      },
      deleteItem (worker) {
        homeSecretary.deleteItem(this, worker)
      },
      search (string) {
        homeSecretary.search(this, string)
      }
    }
  }
</script>

<style scoped>

</style>
