import { User } from "~~/types";

export const useEditUserStore = defineStore({
  id: "edit-user-store",
  state: () => {
    const newData: { firstName: string; lastName: string } = {
      firstName: "",
      lastName: "",
    };
    const loading: boolean = false;

    return {
      newData,
      loading,
    };
  },
  actions: {
    setFirstName(name: string) {
      this.newData.firstName = name;
    },
    setLastName(name: string) {
      this.newData.lastName = name;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
  },
  getters: {},
});
