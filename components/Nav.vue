<template>
  <nav class="z-50 w-full fixed top-0 bg-white py-4 shadow">
    <div class="container flex justify-between items-center">
      <div class="flex items-center">
        <img class="w-8 mr-2" src="@/assets/img/logo.png" alt="logo Ezshop" />
        <h1 class="font-base text-primary text-lg">
          <span class="font-bold">Ez</span>shop
        </h1>
      </div>

      <div class="flex items-center">
        <CurrencySwitcher />

        <span class="text-primary text-sm font-bold mr-2" v-show="cartTotal">${{ cartTotal }}</span>

        <div class="relative mr-2">
          <img src="@/assets/img/cart.png" alt="icono carrito" />
          <div
            v-show="cart.length"
            class="absolute w-5 h-5 border-2 border-white absolute bg-primary rounded-full flex justify-center items-center"
            style="top: -10px; right: -10px;"
          >
            <span class="text-white" style="font-size: 8px;">{{ cart.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CurrencySwitcher from "@/components/CurrencySwitcher";

export default {
  name: "Nav",
  components: {
    CurrencySwitcher
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters(["cartTotal"])
  }
};
</script>

<style>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 125ms ease-in-out;
}
.fade-down-enter, .fade-down-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.currency-dropdown {
  top: 40px;
  width: 100px;
  left: 50%;
  transform: translateX(-50%);
  @apply absolute bg-white shadow-lg text-sm rounded;
}
</style>

