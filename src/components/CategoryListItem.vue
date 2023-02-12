<script setup>
import { ref } from "vue";
import { useCategoryStore } from "../store/categoryStore";
import EditCategoryModal from "./modals/EditCategoryModal.vue";

const props = defineProps({
    category: { type: Object, required: true },
});

const categoryStore = useCategoryStore();

const error = ref("");
</script>

<template>
    <div class="category-list__item">
        <p class="subheader">
            {{ category.name }}
        </p>
        <EditCategoryModal :category="category"/>
    </div>
</template>

<style>
.category-list__item {
    border: 2px solid #8c67d9;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>