type Feed = {
  banners: Array<object>;
  books: {
    newest: Array<object>;
    mostViewed: Array<object>;
    highestDiscount: Array<object>;
    selected: Array<object>;
  };
};

export { Feed };
