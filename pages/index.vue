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
      console.log(window.pageYOffset);
      const docHeight = document.documentElement.scrollHeight;
      console.log(docHeight);
      if (window.pageYOffset > docHeight - 300) {
        console.log("ahora");
      }
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
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
