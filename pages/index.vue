<template>
  <div class="container">
    <h2 class="leading-none font-bold text-2xl lg:text-5xl my-5 lg:my-12 lg:tracking-tight">Almacén</h2>
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

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
}
</style>
