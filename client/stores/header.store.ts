import { Book } from "~~/types";

export const useHeaderStore = defineStore({
  id: "header-store",
  state: () => {
    const leftDir: boolean = false;
    const loading: boolean = false;
    const searchPhrase: string = "";
    const searchResults: Book[] = [];
    const categories: { name: string; items: any[] }[] = [
      {
        name: "درسی",
        items: [
          { name: "پیش دبستان", items: [] },
          {
            name: "دبستان",
            items: [
              "پایه اول",
              "پایه دوم",
              "پایه سوم",
              "پایه چهارم",
              "پایه پنجم",
              "پایه ششم",
            ],
          },
          { name: "متوسطه اول", items: ["پایه هفتم", "پایه هشتم", "پایه نهم"] },
          {
            name: "متوسطه دوم",
            items: ["پایه دهم", "پایه یازدهم", "پایه دوازدهم"],
          },
          {
            name: "شاخه نظری",
            items: ["ریاضی و فیزیک", "علوم تجربی", "علوم انسانی", "مشترک"],
          },
          {
            name: "شاخه هنرستان",
            items: ["هنر", "صنعت", "خدمات", "کشاورزی", "مدیریت", "مشترک"],
          },
        ],
      },
      {
        name: "کمک درسی",
        items: [
          { name: "کنکور", items: ["جامع", "پایه"] },
          { name: "تشریحی", items: [] },
          { name: "تست", items: [] },
        ],
      },
      {
        name: "دانشگاهی",
        items: [
          { name: "گروه ریاضی و فیزیک", items: [] },
          { name: "گروه علوم تجربی", items: [] },
          { name: "گروه علوم انسانی", items: [] },
          { name: "گروه هنر", items: [] },
          { name: "گروه زبان های خارجه", items: [] },
          { name: "عمومی/مشترک", items: [] },
        ],
      },
      {
        name: "عمومی",
        items: ["ادبیات و داستانی", "سبک زندگی", "کسب و کار", "کودک و نوجوان"],
      },
      {
        name: "زبان",
        items: [],
      },
      {
        name: "آزمون",
        items: [
          "آزمون کاردانی به کارشناسی",
          "آزمون کارشناسی ارشد",
          "آزمون دکترا",
          "آزمون استخدامی",
        ],
      },
    ];
    const subCategoryIndex: number = 0;
    const universityTabIndex: number = 0;

    return {
      leftDir,
      loading,
      searchPhrase,
      searchResults,
      categories,
      subCategoryIndex,
      universityTabIndex,
    };
  },
  actions: {
    setDir(value: boolean) {
      this.leftDir = value;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setSearchPhrase(phrase: string) {
      this.searchPhrase = phrase;
    },
    setSearchResults(items: Book[]) {
      this.searchResults = items;
    },
    setSubCategoryIndex(index: number) {
      this.subCategoryIndex = index;
    },
    setUniversityTabIndex(index: number) {
      this.universityTabIndex = index;
    },
    setUniversityFields(items: { name: string; parent: string }[]) {
      this.categories[2].items[0].items = items.filter(
        (i) => i.parent === "شاخه دانشگاهی ریاضی و فیزیک"
      );
      this.categories[2].items[1].items = items.filter(
        (i) => i.parent === "شاخه دانشگاهی علوم تجربی"
      );
      this.categories[2].items[2].items = items.filter(
        (i) => i.parent === "شاخه دانشگاهی علوم انسانی"
      );
      this.categories[2].items[3].items = items.filter(
        (i) => i.parent === "شاخه دانشگاهی هنر"
      );
      this.categories[2].items[4].items = items.filter(
        (i) => i.parent === "شاخه دانشگاهی زبان"
      );
    },
  },
  getters: {
    noResults(): boolean {
      return this.searchResults.length === 0;
    },
  },
});
