import { City, State, Address, Cart } from "~~/types";

export const useCartStore = defineStore({
  id: "cart-store",
  state: () => {
    const loading: boolean = false;
    const cart: Cart = {
      items: [],
      totalPrice: 0,
      totalPriceAfterDiscount: 0,
      addressId: 0,
    } as Cart;
    const addresses: Address[] = [];
    const states: State[] = [];
    const cities: City[] = [];

    return {
      loading,
      cart,
      addresses,
      states,
      cities,
    };
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setCart(cart: Cart) {
      this.cart = cart;
    },
    setAddresses(items: Address[]) {
      this.addresses = items;
    },
    setStates(items: State[]) {
      this.states = items;
    },
    setCities(items: City[]) {
      this.cities = items;
    },
    reset() {
      this.loading = false;
      this.cart = {
        items: [],
        totalPrice: 0,
        totalPriceAfterDiscount: 0,
        addressId: 0,
      };
      this.addresses = [];
    },
  },
  getters: {},
});
