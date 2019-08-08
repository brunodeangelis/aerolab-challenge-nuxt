export const state = () => ({
  products: [],
  cart: [],
  page: {},
  fetchingProducts: false
});

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCTS(state, products) {
    products.forEach(p => state.products.push(p));
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  ADD_TO_CART(state, product) {
    state.cart.push(product);
  },
  REMOVE_FROM_CART(state, product) {
    state.cart.splice(state.cart.findIndex(p => p.id == product.id), 1);
  },
  SET_FETCHING_PRODUCTS(state, isFetching) {
    state.fetchingProducts = isFetching;
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
  },
  async fetchPage({ state, commit }, pageNumber) {
    commit("SET_FETCHING_PRODUCTS", true);

    const { data } = await this.$axios.get(
      `https://challenge-api.aerolab.co/products?page=${pageNumber}`
    );
    commit("ADD_PRODUCTS", data.products);

    const page = {
      current: pageNumber,
      total: state.page.total
    };
    commit("SET_PAGE", page);

    commit("SET_FETCHING_PRODUCTS", false);
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
