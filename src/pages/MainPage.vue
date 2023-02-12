<script setup>
import { onMounted, ref, computed } from "vue";
import ProductList from "../components/ProductList.vue";
import ProductsFilter from "../components/ProductsFilter.vue";
import { useProductStore } from "../store/productStore";
import { useCategoryStore } from "../store/categoryStore";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const selectedSort = ref("");
const searchQuery = ref("");
const selectedCategory = ref(0);

const searchResults = computed(() => productStore.products.filter(product => product.name.toLowerCase().includes(searchQuery.value.toLowerCase())));

const categorySortResults = computed(() => {
    if(!selectedCategory.value) {
        return searchResults.value;
    }
    return searchResults.value.filter(product => product.category_id === selectedCategory.value);
});

onMounted(async () => {
    await productStore.getProducts();
    await categoryStore.getCategories();
});
</script>

<template>
    <div class="main-page">
        <ProductsFilter
          v-model:selected-category="selectedCategory"
          v-model:selected-sort="selectedSort"
          v-model:search-query="searchQuery"
          :categories="categoryStore.categories"
        />
        <ProductList :products="categorySortResults"/>
    </div>
</template>

<style>
.main-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>