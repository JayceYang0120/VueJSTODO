import { uid } from 'quasar'

const state = {
  tasks: []
}

const mutations = {
  updateTask(state, payload) {
    state.tasks.forEach((task) => {
      if (task.id === payload.id) {
        task.finished = JSON.parse(JSON.stringify(payload.finished))
      }
    })
  },

  deleteTask(state, id) {
    let IndDelete = 0
    state.tasks.forEach((task, index) => {
      if(task.id === id) {
        IndDelete = JSON.parse(JSON.stringify(index))
      }
    })
    state.tasks.splice(IndDelete, 1)
  },

  addTask(state, payload) {
    state.tasks.push({
      id: payload.id,
      name: payload.task.name,
      dueDate: payload.task.dueDate,
      dueTime: payload.task.dueTime,
      finished: false,
    })
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },

  deleteTask({commit}, id) {
    commit('deleteTask', id)
  },
  
  addTask({commit}, task) {
    let taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}