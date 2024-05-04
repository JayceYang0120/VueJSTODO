<template>
  <q-page padding class="q-pa-md">
    <q-list bordered separator>
      <task-list v-for="(task, key) in tasks" :key="key" :task="task" />
    </q-list>
    <div @click="showAddTask = !showAddTask" class="absolute-bottom text-center">
      <q-btn round color="primary" icon="add" size="20px" />
    </div>
    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = !showAddTask" />
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed } from "vue"
import { useStore } from 'vuex'

import TaskList from '../components/Tasks/TaskList.vue'
import AddTask from '../components/Tasks/Modals/AddTask.vue'

export default {
  components: {
    TaskList,
    AddTask
  },

  setup() {
    const store = useStore()
    const tasks = computed(() => store.getters['tasks/tasks'])
    const showAddTask = ref(false)

    return {
      tasks,
      showAddTask
    }

  },
};
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  } 
</style>
