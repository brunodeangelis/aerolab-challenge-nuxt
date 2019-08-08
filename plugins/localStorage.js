import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ["cart", "currency"]
    })(store);
  });
};
