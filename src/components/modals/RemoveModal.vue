<script setup>
import ModalWindow from "../UI/ModalWindow.vue";
import { ref } from "vue";

const props = defineProps({
    obj: { type: String, required: true },
    handleRemoveFunc: { type: Function, required: true },
});

const showRemoveModal = ref(false);
const error = ref("");

async function handleRemove() {
    try {
        await props.handleRemoveFunc();
        showRemoveModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }

}
</script>

<template>
    <ModalWindow v-model:is-visible="showRemoveModal">
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <h2 class="subheader">Are you sure you want to delete {{ obj }}?</h2>
        <button
          class="button button_danger"
          @click="handleRemove"
        >
            Remove
        </button>
    </ModalWindow>
    <button
      class="button button_danger"
      @click="showRemoveModal=true"
    >
        Remove
    </button>
</template>