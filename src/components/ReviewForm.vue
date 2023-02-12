<script setup>
import { ref } from "vue";

const emits = defineEmits(["sendReviewData"]);

const props = defineProps({
    formData: {type: Object,}
});

const reviewText = ref(props.formData?.review_text || "");

function sendReviewData() {
    emits("sendReviewData", {review_text: reviewText.value});
    reviewText.value = "";
}

</script>

<template>
    <form
      class="form"
      @submit.prevent="sendReviewData">
        <textarea
          required
          class="textarea"
          v-model="reviewText"
          placeholder="Enter your review"
          cols="30"
          rows="10"
        >
        </textarea>
        <button class="button button_success">Send</button>
    </form>
</template>