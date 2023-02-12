<script setup>
import CategoryForm from "../CategoryForm.vue";
import { ref } from "vue";
import { useCategoryStore } from "../../store/categoryStore";

const showCreateCategoryModal = ref(false);
const error = ref("");

const categoryStore = useCategoryStore();

async function addCategory(categoryData) {
    try {
        await categoryStore.addCategory(categoryData);
        showCreateCategoryModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}
</script>
<template>
    <p
      class="error"
      v-if="error"
    >
        {{ error }}
    </p>
    <ModalWindow v-model:is-visible="showCreateCategoryModal">
        <CategoryForm
          :error="error"
          @sendCategoryData="addCategory"
        />
    </ModalWindow>
    <button
      class="button button_info"
      @click="showCreateCategoryModal=true"
    >
        Add category
    </button>
</template>