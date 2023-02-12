<script setup>
import CategoryListItem from "./CategoryListItem.vue";

const props = defineProps({
    categories: { type: Array, required: true },
});
</script>

<template>
    <div class="category-list">
        <CategoryListItem
          v-for="category in categories"
          :category="category"
          @update-category="$emit('updateCategory', category.id)"
          @remove-category="$emit('removeCategory', category.id)"
        />
    </div>
</template>

<style>

</style>