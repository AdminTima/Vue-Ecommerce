<script setup>
import { onMounted } from "vue";
import CartItemList from "../components/CartItemList.vue";
import { useCartStore } from "../store/cartStore";
import { CartService } from "../service/cartService";

const cartStore = useCartStore();

onMounted(() => {
    cartStore.getCart();
});
</script>

<template>
    <h1 class="header">Cart</h1>
    <h2 class="subheader">Total sum: {{ cartStore.cart.total_sum }}</h2>
    <CartItemList
      class="cart__item-list"
      :cart-item-list="cartStore.cart.cart_items || []"
    />
    <button
      class="button button_success"
      @click="CartService.buy"
      v-if="cartStore.cart.cart_items?.length"
    >
        Buy
    </button>
</template>

<style>
.cart__item-list {
    margin: 15px;
}
</style>