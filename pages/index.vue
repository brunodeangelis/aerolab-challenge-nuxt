<template>
  <div class="container">
    <h2 class="leading-none font-bold text-2xl my-5">Almacén</h2>
    <div class="grid-container mb-32">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard";

export default {
  components: {
    ProductCard
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
      fetchingProducts: state => state.fetchingProducts
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
