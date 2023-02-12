import { defineStore } from "pinia/dist/pinia";
import { CartService } from "../service/cartService";
import { ref } from "vue";


export const useCartStore = defineStore("cartStore", () => {
    const cart = ref({});
    const cartItems = ref([]);

    async function getCart() {
        try {
            cart.value = await CartService.getUserCart();
            cartItems.value = cart.value.cart_items;
        } catch (err) {
            console.log(err);
        }
    }

    async function updateCartItemProductAmount(cartItemId, newAmount) {
        cart.value = await CartService.updateCartItemProductAmount(cartItemId, newAmount);
        cartItems.value = cart.value.cart_items;
    }

    async function removeCartItem(cartItemId) {
        cart.value =  await CartService.removeCartItem(cartItemId);
        cartItems.value = cart.value.cart_items;
    }

    return {
        cart,
        cartItems,
        getCart,
        removeCartItem,
        updateCartItemProductAmount,
    }
})