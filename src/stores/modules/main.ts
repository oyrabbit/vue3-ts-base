import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => ({
    token: '',

    isLoading: false
  })
})

export default useMainStore
