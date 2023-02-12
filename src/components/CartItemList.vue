<script setup>
import CartItemListItem from "./CartItemListItem.vue";
import { useCartStore } from "../store/cartStore";

const cartStore = useCartStore();

</script>


<template>
    <div
      class="cart-item-list"
      v-if="cartStore.cartItems"
    >
        <CartItemListItem
          v-for="cartItem in cartStore.cartItems"
          :cart-item="cartItem"
          :key="cartItem.id"
        />
    </div>
</template>

<style>
.cart-item-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
}
</style>