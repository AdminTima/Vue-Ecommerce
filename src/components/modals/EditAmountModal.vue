<script setup>
import { ref } from "vue";
import { useCartStore } from "../../store/cartStore";

const props = defineProps({
    cartItemId: { type: Number, required: true },
    previousAmount: { type: Number, required: true },
});

const cartStore = useCartStore();

const showEditAmountModal = ref(false);
const productAmount = ref(props.previousAmount);
const error = ref("");

async function updateCartItemProductAmount(e) {
    try {
        e.target.checkValidity();
        if(props.previousAmount !== productAmount.value) {
            cartStore.updateCartItemProductAmount(props.cartItemId, productAmount.value);
        }
        showEditAmountModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}
</script>

<template>
    <ModalWindow v-model:is-visible="showEditAmountModal">
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <form
          class="form"
          @submit.prevent="updateCartItemProductAmount"
        >
            <input
              class="input"
              type="number"
              v-model="productAmount"
              min="1"
            >
            <button class="button button_success">Save</button>
        </form>
    </ModalWindow>
    <button
      class="button button_info"
      @click="showEditAmountModal=true"
    >
        Edit amount
    </button>
</template>