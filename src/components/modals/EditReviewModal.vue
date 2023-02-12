<script setup>
import { ref } from "vue";
import ReviewForm from "../ReviewForm.vue";
import RemoveModal from "./RemoveModal.vue";
import { useUserStore } from "../../store/userStore";
import { useProductStore } from "../../store/productStore";

const props = defineProps({
    review: { type: Object, required: true },
});

const userStore = useUserStore();
const productStore = useProductStore();

const isAdmin = ref(userStore.user.is_staff);
const isOwner = ref(userStore.user.id === props.review.user.id);
const error = ref("");
const showEditReviewModal = ref(false);

async function removeReview() {
    try {
        await productStore.removeReview(props.review.id);
        showEditReviewModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response.data;
    }
}


async function updateReview(reviewData) {
    try {
        await productStore.updateReview(props.review.id, reviewData);
        showEditReviewModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response.data;
    }
}

</script>

<template>
    <ModalWindow v-model:is-visible="showEditReviewModal">
        <ReviewForm
          v-if="isOwner"
          :form-data="review"
          @send-review-data="updateReview"
        />
        <RemoveModal
          :obj="review.review_text"
          :handle-remove-func="removeReview"
        />
    </ModalWindow>
    <button
      class="button button_info"
      @click="showEditReviewModal=true"
      v-if="isOwner || isAdmin"
    >
        Edit
    </button>
</template>