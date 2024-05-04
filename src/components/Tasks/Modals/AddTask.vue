<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn flat round icon="close" v-close-popup />
    </q-card-section>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            class="col"
            label="Task"
            v-model="taskToSubmit.name"
            outlined
            :rules="[(val) => !!val || 'Task is required']"
            ref="taskName"
          />
        </div>
        <div class="row q-mb-sm">
          <q-input label="Due Date" v-model="taskToSubmit.dueDate" mask="date" outlined>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-mb-sm">
          <q-input label="Due Time" v-model="taskToSubmit.dueTime" mask="time" outlined>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn type="submit" label="Save" color="primary" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { ref } from "vue"
import { useStore } from 'vuex'

export default {
  emits: ['close'],
  setup(props, {emit}) {
    const store = useStore()

    const taskName = ref('')
    const taskToSubmit = ref({
      name: "",
      dueDate: "",
      dueTime: "",
      finished: false,
    })

    const submitForm = () => {
      taskName.value.validate()
      if (!taskName.value.hasError) {
        submitTask(taskToSubmit.value)
      }
    }

    const submitTask = (task) => {
      store.dispatch('tasks/addTask', task)
      emit('close')
    }

    return {
      taskName,
      taskToSubmit,
      submitForm,
    };
  },
};
</script>
