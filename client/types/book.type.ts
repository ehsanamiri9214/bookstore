import { Publisher, Category } from "~~/types";

type Book = {
  id: number;
  name: string;
  image: string;
  writers: string;
  authors: string;
  translators: string;
  year: number;
  round: number;
  edit: number;
  pages: number;
  weight: number;
  price: number;
  discount: number;
  category: Category;
  publisher: Publisher;
};

export { Book };
