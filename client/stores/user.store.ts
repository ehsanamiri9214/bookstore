import { User } from "~~/types"

export const useUserStore = defineStore({
  id: "user-store",
  state: () => {
    const user: User = {} as User
    const loading: boolean = false

    return {
      user,
      loading,
    }
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setLoading(value: boolean) {
      this.loading = value
    },
  },
  getters: {},
})
