export const state = () => ({
  products: [],
  cart: [],
  page: {}
});

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  ADD_TO_CART(state, product) {
    state.cart.push(product);
  },
  REMOVE_FROM_CART(state, product) {
    state.cart.splice(state.cart.findIndex(p => p.id == product.id), 1);
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const { data } = await $axios.get(
      "https://challenge-api.aerolab.co/products"
    );
    commit("SET_PRODUCTS", data.products);

    const page = {
      current: data.page,
      total: data.page_count
    };
    commit("SET_PAGE", page);
  }
};

export const getters = {
  cartTotal(state) {
    return state.cart.length
      ? state.cart
          .map(item => item.price)
          .reduce((total, price) => total + price)
          .toFixed(2)
          .replace(/\./g, ",")
      : false;
  }
};
