<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { BASE_API } from "../api/apiRoutes";
import { CartService } from "../service/cartService";
import ReviewForm from "../components/ReviewForm.vue";
import ReviewList from "../components/ReviewList.vue";
import { useUserStore } from "../store/userStore";
import { useProductStore } from "../store/productStore";
import NotFoundPage from "./NotFoundPage.vue";

const route = useRoute();
const userStore = useUserStore();
const productStore = useProductStore();

const productId = ref(route.params.productId);
const showCartAddedMessage = ref(false);


async function addProductToCart() {
    try {
        await CartService.addCartItem({ product_id: productStore.product.id,
            total_sum: productStore.product.price,
        });
        showCartAddedMessage.value = true;
    } catch (err) {
        console.log(err);
    }
}

async function createReview(reviewData) {
    try {
        await productStore.createReview(reviewData);
    } catch (err) {
        console.log(err);
    }
}

onMounted(() => {
    productStore.getProduct(productId.value);
});
</script>

<template>
    <div
      class="product-detail-page"
      v-if="productStore.product"
    >
        <h1 class="header">{{ productStore.product?.name }}</h1>
        <p class="text_ordinary">Description: {{ productStore.product?.description }}</p>
        <p class="text_ordinary">Price: {{ productStore.product?.price }}$</p>
        <p class="text_ordinary">
            Category: {{ productStore.product?.category?.name || "No category" }}
        </p>
        <p class="text_ordinary">Bought times: {{ productStore.product?.bought_times }}</p>
        <img
          class="image image_medium"
          :src="`${BASE_API}/${productStore.product?.photo}`"
          alt=""
        >
        <button
          class="button button_success"
          @click="addProductToCart"
        >
            Add to cart
        </button>
        <PopUpWindow
          v-model="showCartAddedMessage"
          :show-time="3"
        >
            <h1 class="header">Successfully added</h1>
        </PopUpWindow>
        <ReviewForm @send-review-data="createReview"/>
        <ReviewList/>
    </div>
   <NotFoundPage v-else/>
</template>

<style>
.product-detail-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
}
</style>