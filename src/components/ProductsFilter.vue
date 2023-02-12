<script setup>
const emits = defineEmits([
    "update:selectedCategory",
    "update:searchQuery",
    "update:selectedSort",
]);

const props = defineProps({
    selectedCategory: { type: Number, required: true },
    searchQuery: { type: String, required: true },
    categories: { type: Array, required: true },
});


function updateSearchQuery(e) {
    emits("update:searchQuery", e.target.value);
}

function updateSelectedCategory(e) {
    emits("update:selectedCategory", +e.target.value);
}
</script>

<template>
    <div class="products-filters">
        <input
          class="input"
          :value="searchQuery"
          @input="updateSearchQuery"
        />
        <select
          class="block_bordered border-blue products-filters__select subheader"
          @change="updateSelectedCategory"
        >
            <option disabled>Select category</option>
            <option value="">All</option>
            <option
              v-for="category in categories"
              :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>
    </div>
</template>

<style>
.products-filters {
    display: flex;
    justify-content: center;
    align-items: start;
    column-gap: 20px;
}

.products-filters__select {
    padding: 3px;
    margin-bottom: 20px;
}
</style>

