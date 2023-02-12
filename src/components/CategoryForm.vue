<script setup>
import { ref } from "vue";

const emits = defineEmits(["sendCategoryData"]);

const props = defineProps({
    category: { type: Object, default: null },
    error: { type: String, required: true },
});

const name = ref(props.category?.name || "");

function sendCategoryData() {
    if(props.category) {
        emits("sendCategoryData", {id: props.category.id, name: name.value});
    } else {
        emits("sendCategoryData", {name: name.value});
    }
}

</script>

<template>
    <p class="error" v-if="error">{{ error }}</p>
    <form
      class="form"
      @submit.prevent="sendCategoryData"
    >
        <CustomInput
          placeholder="Category name"
          v-model="name"
        />
        <button
          class="button button_success"
        >
            {{ category ? "Update" : "Add" }} category
        </button>
    </form>
</template>