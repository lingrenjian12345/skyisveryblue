import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Vue.prototype.$http = axios
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务数组
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 下一个id
    nextId: 5,
    viewkey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, value) {
      state.inputValue = value
    },
    // 增
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删
    removeItem(state, id) {
      // var index = state.list.forEach((item, index) => {
      //   if (item.id === id) {
      //     return index
      //   }
      // })
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    isComplate(state, parmas) {
      const index = state.list.findIndex(item => item.id === parmas.id)
      if (index !== -1) {
        state.list[index].done = parmas.done
      }
    },
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeViewkey(state, parmas) {
      state.viewkey = parmas
      // console.log(state.viewkey)
    }
  },
  actions: {
    async getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(item => item.done === false).length
    },
    infolist(state) {
      if (state.viewkey === 'all') {
        return state.list
      } else if (state.viewkey === 'undone') {
        return state.list.filter(item => item.done === false)
      } else if (state.viewkey === 'done') {
        return state.list.filter(item => item.done === true)
      }
      return state.list
    }
  }
})
