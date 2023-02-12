<script setup>
import { BASE_API } from "../api/apiRoutes";
import EditAmountModal from "./modals/EditAmountModal.vue";
import RemoveModal from "./modals/RemoveModal.vue";
import { useCartStore } from "../store/cartStore";
import { ref } from "vue";

const emits = defineEmits(["remove"]);

const props = defineProps({
    cartItem: { type: Object, required: true },
});

const cartStore = useCartStore();

const error = ref("");


async function removeCartItem() {
    await cartStore.removeCartItem(props.cartItem.id);
}
</script>

<template>
    <div class="cart-item-list__item block-shadow_blue">
        <h2 class="subheader">{{ cartItem.product.name }}</h2>
        <h2 class="subheader">Price: {{ cartItem.product.price }}</h2>
        <h2 class="subheader">Total: {{ cartItem.total_sum }}</h2>
        <img
          :src="`${BASE_API}/${cartItem.product.photo}`"
          alt="product image"
          class="image image_medium"
        >
        <p class="text_ordinary">Amount: {{ cartItem.amount }}</p>

        <EditAmountModal
          :cart-item-id="props.cartItem.id"
          :previous-amount="props.cartItem.amount"
        />
       <RemoveModal
         :obj="cartItem.product.name"
         :handle-remove-func="removeCartItem"
       />
    </div>
</template>

<style>
.cart-item-list__item {
    box-shadow: 0 2px 7px 5px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 450px;
}
</style>