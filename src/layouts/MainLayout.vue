<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title>Todo List</q-toolbar-title>
        </q-toolbar>
      </q-toolbar>
    </q-header>
    <q-drawer class="aside" v-model="drawerLeft" show-if-above bordered style="width:300px;" >
      <q-list>
        <q-item-label header> Titile </q-item-label>
        <q-item clickable v-for="nav in navs" :key="nav.id" :to="nav.to">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-footer class="footer">
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    const drawerLeft = ref(false)

    const navs = ref([
      {
        label: 'List',
        to: '/',
        id: 1,
      }
    ])

    return {
      drawerLeft,
      navs,
    }
  },
  mounted() {},
};
</script>

<style lang="scss">
 @media screen and (min-width: 750px) {
  .footer {
    display: none;
  }
 }

 @media screen and (max-width: 760px) {
  .aside {
    display: none;
  }
 }
</style>
