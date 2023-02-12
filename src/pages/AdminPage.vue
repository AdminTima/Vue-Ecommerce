<script setup>
import CreateProductModal from "../components/modals/CreateProductModal.vue";
import CreateCategoryModal from "../components/modals/CreateCategoryModal.vue";
import { ref, onMounted } from "vue";
import CategoryList from "../components/CategoryList.vue";
import { useProductStore } from "../store/productStore";
import { useCategoryStore } from "../store/categoryStore";


const showUpdateCategoryForm = ref({show: false, categoryId: null});
const showRemoveCategoryForm = ref({show: false, categoryId: null});

const productStore = useProductStore();
const categoryStore = useCategoryStore();

// todo: Maybe add error handling middleware.

onMounted(() => {
    if(!categoryStore.categories.length) {
        categoryStore.getCategories();
    }
});
</script>

<template>
    <div>
        <h1 class="header">Admin</h1>
        <div class="admin__modals">
            <CreateProductModal/>
            <CreateCategoryModal/>
        </div>
        <CategoryList
          class="admin__category-list"
          :categories="categoryStore.categories"
          @update-category="(categoryId) => {
              showUpdateCategoryForm.show=true;
              showUpdateCategoryForm.categoryId = categoryId;
          }"
          @remove-category="(categoryId) => {
              showRemoveCategoryForm.show=true;
              showRemoveCategoryForm.categoryId=categoryId;
          }"
        />
    </div>
</template>

<style>
.admin__modals {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    margin: 15px;
}

.admin__category-list {
    margin: 25px;
}
</style>
