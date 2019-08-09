<template>
  <article class="product bg-white px-3 py-4 rounded shadow flex flex-col items-center w-full">
    <picture>
      <source :srcset="JPEGtoWEBP(product.photo)" type="image/webp" />
      <source :srcset="product.photo" type="image/jpeg" />
      <img :src="product.photo" :alt="product.name" />
    </picture>

    <div class="text-center mt-2 flex flex-col flex-1">
      <p class="text-sm text-center">{{ product.name }}</p>

      <div class="flex justify-center items-center flex-1 mt-3 mb-4">
        <span
          v-if="isOnSale(product)"
          class="font-bold text-xs line-through mr-2"
        >${{ currency != "ARS" ? formatPrice(product[`originalPriceIn${currency}`]) : formatPrice(product.originalPrice) }}</span>
        <h3 class="font-bold text-primary text-normal">
          <span v-show="isOnCart(product)">{{ amountOnCart(product) }}x</span>
          ${{ currency != "ARS" ? formatPrice(product[`priceIn${currency}`]) : formatPrice(product.price) }}
        </h3>
      </div>

      <button
        v-if="!isOnCart(product)"
        class="btn primary outline text-sm"
        @click="$store.commit('ADD_TO_CART', product)"
      >Agregar al carrito</button>
      <div v-else class="flex items-center justify-between">
        <button
          class="w-8 h-8 bg-primary text-white rounded text-sm"
          @click="$store.commit('REMOVE_FROM_CART', product)"
        >-</button>
        <span class="text-center text-primary text-sm font-bold">{{ amountOnCart(product) }}</span>
        <button
          class="w-8 h-8 bg-primary text-white rounded text-sm"
          @click="$store.commit('ADD_TO_CART', product)"
        >+</button>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["product"],
  methods: {
    isOnSale(product) {
      return product.price < product.originalPrice;
    },
    isOnCart(product) {
      return this.cart.some(p => p.id == product.id);
    },
    amountOnCart(product) {
      return this.cart.filter(p => p.id == product.id).length;
    },
    formatPrice(price) {
      return price
        .toFixed(2)
        .toString()
        .replace(/\./g, ",");
    },
    JPEGtoWEBP(jpeg) {
      return jpeg.replace(/(.jpg)/g, ".webp");
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      page: state => state.page,
      currency: state => state.currency
    })
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .product {
    transition: all 150ms ease-in-out;
  }

  .product:hover {
    transform: translateY(-1px);
    @apply shadow-lg;
  }
}
</style>

