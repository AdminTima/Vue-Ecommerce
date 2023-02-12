<script setup>
import ProductForm from "../ProductForm.vue";
import { ref, watch } from "vue";
import { useCategoryStore } from "../../store/categoryStore";
import { useProductStore } from "../../store/productStore";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const showCreateProductModal = ref(false);
const error = ref("");

async function addProduct(productData) {
    try {
        await productStore.addProduct(productData);
        showCreateProductModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

watch(showCreateProductModal, (cur) => {
    if(cur) {
        if(!categoryStore.categories) {
            categoryStore.getCategories();
        }
    }
});
</script>
<template>
    <ModalWindow v-model:is-visible="showCreateProductModal">
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <ProductForm
          @sendProductData="addProduct"
          :category-list="categoryStore.categories"
          v-model:error="error"
        />
    </ModalWindow>
    <button
      class="button button_info"
      @click="showCreateProductModal=true"
    >
        Add product
    </button>
</template>