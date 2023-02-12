<script setup>
import { BASE_API } from "../api/apiRoutes";
import { useUserStore } from "../store/userStore";
import EditProductModal from "./modals/EditProductModal.vue";

const userStore = useUserStore();

const props = defineProps({
    product: { type: Object, required: true },
});
</script>

<template>
    <div class="product-list__item block-shadow_blue">
        <h2 class="subheader">{{ product.name.slice(0, 10) }}...</h2>
        <p class="text_ordinary">{{ product.description.slice(0, 20) }}...</p>
        <p class="text_ordinary">Price: {{ product.price }}</p>
        <p class="text_ordinary">Category: {{ product.category?.name || "No category"}}</p>
        <img
          :src="`${BASE_API}/${product.photo}`"
          alt="product image"
          class="block_bordered product-list__item-image"
        >
        <RouterLink
          class="button button_info"
          :to="{name: 'product', params: {productId: product.id}}"
        >
            Detail
        </RouterLink>
        <EditProductModal
          v-if="userStore.user.is_staff"
          :product="product"
        />
    </div>
</template>


<style>
.product-list__item {
    width: 300px;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: start;
    justify-content: center;
}

.product-list__item-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
}
</style>