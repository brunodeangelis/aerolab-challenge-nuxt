<template>
  <div class="font-sans">
    <Nav />
    <nuxt />
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  components: {
    Nav
  }
};
</script>


<style>
body {
  padding-top: 68px;
  background-color: #f5f5f5;
}

button:focus {
  @apply outline-none;
}

.btn {
  @apply rounded py-1 px-2;
}

.btn.primary.outline {
  @apply border border-primary text-primary;
}

.btn.primary.fill {
  @apply bg-primary text-white;
}
</style>
