<script setup>
import CategoryForm from "../CategoryForm.vue";
import { useCategoryStore } from "../../store/categoryStore";
import { ref } from "vue";
import RemoveModal from "./RemoveModal.vue";

const props = defineProps({
    category: { type: Object, required: true },
});

const categoryStore = useCategoryStore();

const error = ref("");
const showEditCategoryModal = ref(false);

async function updateCategory(updatedData) {
    try {
        await categoryStore.updateCategory(props.category.id, updatedData);
        showEditCategoryModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

async function removeCategory() {
    await categoryStore.removeCategory(props.category.id);
    showEditCategoryModal.value = false;
}

</script>

<template>
    <ModalWindow v-model:is-visible="showEditCategoryModal">
        <CategoryForm
          :category="category"
          @send-category-data="updateCategory"
          v-model:error="error"
        />
        <RemoveModal
          :obj="category.name"
          :handle-remove-func="removeCategory"
        />
    </ModalWindow>
    <button
      @click="showEditCategoryModal=true"
      class="button button_info"
    >
        Edit
    </button>
</template>