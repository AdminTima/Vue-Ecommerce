<script setup>
import { useUserStore } from "../store/userStore";
import { useProductStore } from "../store/productStore";
import EditReviewModal from "./modals/EditReviewModal.vue";

const props = defineProps({
    review: { type: Object, required: true },
});

const userStore = useUserStore();
const productStore = useProductStore();

</script>

<template>
    <div class="block_bordered border-blue review-list__item">
        <p class="subheader">
            {{ review.review_text }}
        </p>
        <p class="text_ordinary">User: {{ review.user.username }}</p>
        <EditReviewModal :review="review"/>
    </div>
</template>

<style>
.review-list__item {
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}
</style>