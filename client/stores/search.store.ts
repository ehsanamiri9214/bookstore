import { Book } from "~~/types";

export const useSearchStore = defineStore({
  id: "search-store",
  state: () => {
    const loading: boolean = false;
    const searchPhrase: String = "";
    const searchDetails: Object = {};
    const searchResults: Book[] = [] as Book[];
    const activePageIndex: number = 1;
    const activeItems: Book[] = [];
    const numberOfItemsPerPage: number = 12;

    return {
      loading,
      searchPhrase,
      searchDetails,
      searchResults,
      activePageIndex,
      activeItems,
      numberOfItemsPerPage,
    };
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setSearchPhrase(searchPhrase: String) {
      this.searchPhrase = searchPhrase;
    },
    setSearchDetails(details: Object) {
      this.searchDetails = details;
    },
    setSearchResults(items: Book[]) {
      this.searchResults = items;
    },
    setActivePageIndex(index: number) {
      this.activePageIndex = index;
    },
    setActiveItems(items: Book[]) {
      this.activeItems = items;
    },
  },
  getters: {},
});
