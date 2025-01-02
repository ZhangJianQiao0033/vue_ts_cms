import { defineStore } from 'pinia'

const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 100
  }),
  getters: {
    getDoubleCounter(state) {
      return 2 * state.counter
    }
  },
  actions: {
    changeCounterAction(newValue: number) {
      this.counter = newValue
    }
  }
})

export default useCounterStore
