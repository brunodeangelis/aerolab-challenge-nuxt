<template>
  <div class="container">
    <h2 class="leading-none font-bold text-2xl my-5">Almacén</h2>
    <div class="mb-5">
      <p class="text-sm mb-2">Seleccione la moneda</p>
      <button
        v-for="(btnCurrency, i) in currencies"
        :key="i"
        class="text-sm btn primary outline mr-1"
        :class="{ 'fill': btnCurrency == currency }"
        @click="$store.commit('SET_CURRENCY', btnCurrency)"
      >{{ btnCurrency }}</button>
    </div>
    <div class="grid-container mb-8">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div class="flex justify-center mb-16 text-primary" v-show="fetchingProducts">Cargando...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard";

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      currencies: ["ARS", "USD"]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition > docHeight - 550 &&
        this.page.current < this.page.total &&
        !this.fetchingProducts
      ) {
        const nextPage = this.page.current + 1;
        this.$store.dispatch("fetchPage", nextPage);
      }
    }
  },
  computed: {
    ...mapState({
      products: state => state.products,
      page: state => state.page,
      fetchingProducts: state => state.fetchingProducts,
      currency: state => state.currency
    })
  }
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
</style>
