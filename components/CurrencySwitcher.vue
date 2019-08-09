<template>
  <div
    class="relative mr-5 flex items-center cursor-pointer"
    @click="visible = !visible"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    v-on-clickaway="hide"
  >
    <img :src="`/img/${currency.toLowerCase()}.png`" alt="bandera" class="w-8 mr-2" />
    <span class="text-primary text-sm">{{ currency }}</span>
    <div class="dropdown-container">
      <transition name="fade">
        <ul v-show="visible" class="currency-dropdown">
          <li
            v-if="btnCurrency != currency"
            v-for="(btnCurrency, i) in currencies"
            :key="i"
            class="flex items-center px-4 py-1"
            @click="$store.commit('SET_CURRENCY', btnCurrency)"
          >
            <img :src="`/img/${btnCurrency.toLowerCase()}.png`" alt="bandera" class="w-8 mr-1" />
            <span>{{ btnCurrency }}</span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      visible: false,
      currencies: ["ARS", "USD"]
    };
  },
  methods: {
    hide() {
      this.visible = false;
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency
    })
  }
};
</script>

<style>
.dropdown-container {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  @apply pt-6;
}

.currency-dropdown {
  width: 100px;
  @apply bg-white shadow-lg text-sm rounded;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 125ms ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
