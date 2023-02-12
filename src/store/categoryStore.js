import { defineStore } from "pinia/dist/pinia";
import { CategoryService } from "../service/categoryService";
import { ref } from "vue";


export const useCategoryStore = defineStore("categoryStore", () => {
    const categories = ref([]);

    async function getCategories() {
        try {
            categories.value = await CategoryService.getAllCategories();
        } catch (err) {
            console.log(err);
        }
    }

    async function addCategory(categoryData) {
        const newCategory = await CategoryService.addCategory(categoryData);
        categories.value.unshift(newCategory);
    }

    async function updateCategory(categoryId, categoryData) {
        const updatedCategory = await CategoryService.updateCategory(categoryId, categoryData);
        const categoryIndex = categories.value.findIndex(
            category => category.id === categoryId
        );
        categories.value[categoryIndex] = updatedCategory;
    }

    async function removeCategory(categoryId) {
        await CategoryService.removeCategory(categoryId);
        categories.value = categories.value.filter(category => category.id !== categoryId);
    }

    return {
        categories,
        getCategories,
        addCategory,
        updateCategory,
        removeCategory,
    }
});