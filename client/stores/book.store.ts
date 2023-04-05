import { SERVER_ROUTES } from "~~/constants";
import { makeRequest } from "~~/services";
import { Book } from "~~/types";

export const useBookStore = defineStore({
  id: "book-store",
  state: () => {
    const loading: boolean = false;
    const book: Book = {} as Book;
    const similarBooks: Book[] = [] as Book[];

    return {
      loading,
      book,
      similarBooks,
    };
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setBook(book: Book) {
      this.book = book;
    },
    setSimilarBooks(books: Book[]) {
      this.similarBooks = books;
    },
    reset() {
      this.book = {} as Book;
      this.similarBooks = [] as Book[];
    },
  },
  getters: {},
});
