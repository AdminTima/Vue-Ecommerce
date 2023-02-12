<script setup>
import ProductListItem from "./ProductListItem.vue";

const props = defineProps({
    products: { type: [Array, null], required: true },
});
</script>

<template>
    <div
      class="product-list"
      v-if="products.length"
    >
        <ProductListItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
    </div>
    <h2
      class="header"
      v-else
    >
        No products.
    </h2>

</template>


<style>
.product-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}
</style>