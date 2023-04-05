import { Book } from 'src/modules/book/entities/book.entity';

type Feed = {
  banners: object[];
  books: {
    newest: Book[];
    mostViewed: Book[];
    highestDiscount: Book[];
    selected: Book[];
  };
};

export { Feed };
