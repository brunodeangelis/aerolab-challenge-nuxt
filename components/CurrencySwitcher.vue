<template>
  <div
    class="relative mr-5 flex items-center cursor-pointer"
    @click="visible = !visible"
    v-on-clickaway="hide"
  >
    <img :src="`/img/${currency}.png`" alt="bandera" class="w-8 mr-2" />
    <span class="text-primary text-sm">{{ currency }}</span>
    <ul v-show="visible" class="currency-dropdown">
      <li
        v-if="btnCurrency != currency"
        v-for="(btnCurrency, i) in currencies"
        :key="i"
        class="flex items-center px-4 py-1"
        @click="$store.commit('SET_CURRENCY', btnCurrency)"
      >
        <img :src="`/img/${btnCurrency}.png`" alt="bandera" class="w-8 mr-1" />
        <span>{{ btnCurrency }}</span>
      </li>
    </ul>
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
</style>
