export const state = () => ({
  products: [],
  cart: [],
  currency: "ARS",
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
  SET_CURRENCY(state, currency) {
    state.currency = currency;
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
  async nuxtServerInit({ commit }) {
    const shop = await this.$axios.$get(
      "https://aerolab-challenge-nuxt.brunodeangelis.now.sh/api/products"
    );
    commit("SET_PRODUCTS", shop.products);

    const page = {
      current: shop.page,
      total: shop.page_count
    };
    commit("SET_PAGE", page);
  },
  async fetchPage({ state, commit }, pageNumber) {
    commit("SET_FETCHING_PRODUCTS", true);

    const shop = await this.$axios.$get(
      `https://aerolab-challenge-nuxt.brunodeangelis.now.sh/api/products?page=${pageNumber}`
    );
    commit("ADD_PRODUCTS", shop.products);

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
    let prices = [];

    if (state.cart.length) {
      if (state.currency == "ARS") {
        prices = state.cart.map(item => item.price);
      } else {
        prices = state.cart.map(item => item[`priceIn${state.currency}`]);
      }

      return prices
        .reduce((total, price) => total + price)
        .toFixed(2)
        .replace(/\./g, ",");
    }

    return false;
  }
};
