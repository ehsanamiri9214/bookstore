import { Feed } from "~~/types";

export const useAppStore = defineStore({
  id: "app-store",
  state: () => {
    const isAppReady: boolean = false;
    const resultsBoxStatus: boolean = false;
    const showModal: boolean = false;
    const loading: boolean = false;
    const feed: Feed = {
      banners: [],
      books: { newest: [], mostViewed: [], highestDiscount: [], selected: [] },
    } as Feed;

    return {
      isAppReady,
      resultsBoxStatus,
      showModal,
      loading,
      feed,
    };
  },
  actions: {
    setAppStatus(value: boolean) {
      this.isAppReady = value;
    },
    setResultsBoxStatus(value: boolean) {
      this.resultsBoxStatus = value;
    },
    setShowModal(value: boolean) {
      this.showModal = value;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setFeed(data: Feed) {
      this.feed = data;
    },
  },
  getters: {},
});
