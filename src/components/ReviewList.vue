<script setup>
import ReviewListItem from "./ReviewListItem.vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
</script>

<template>
    <div
      class="review-list"
      v-if="productStore.productReviews?.length"
    >
        <p class="subheader">Reviews:</p>
        <ReviewListItem
          :key="review.id"
          v-for="review in productStore.productReviews"
          :review="review"
        />
    </div>
    <p
      class="subheader"
      v-else
    >
        No reviews yet but you can add one.
    </p>
</template>

<style>
.review-list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
}
</style>