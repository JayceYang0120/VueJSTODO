<template>
  <q-item @click="updateTask(updatedTaskPayload)" v-ripple clickable
    :class="!props.task.finished ? 'bg-orange-1': 'bg-green'">
    <q-item-section side top>
      <q-checkbox v-model="props.task.finished"/>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{'text-strike': props.task.finished}">
        {{ props.task.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column">
          <q-item-label caption class="row justify-end">
            {{ props.task.dueDate }}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            {{ props.task.dueTime }}
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side class="column">
      <q-btn @click.stop="BtnToDelete(props.task.id)" flat round dense color="red" icon="delete" size="15px"/>
    </q-item-section>
  </q-item>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  props: ['task'],
  setup(props) {
    const store = useStore()
    const $q = useQuasar()
    const updatedTaskPayload = ref(
      {
        id: props.task.id, 
        finished: true
      }
    )

    const BtnToDelete = (id) => {
      $q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Are you sure you want to delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        store.dispatch('tasks/deleteTask', id)
      })
    }

    return {
      props,
      updatedTaskPayload,
      BtnToDelete,
      updateTask: (payload) => store.dispatch('tasks/updateTask', payload),
    }
  }
};
</script>

<style></style>