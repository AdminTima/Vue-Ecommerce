<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router/dist/vue-router";
import { ProductService} from "../service/productService";
import ProductForm from "../components/ProductForm.vue";
import { useCategoryStore } from "../store/categoryStore";

const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const product = ref(null);

async function getProductData() {
    const response = await ProductService.getProduct(route.params.productId);
    product.value = response.data;
}

async function updateProductData(productData) {
    try {
        await ProductService.updateProductData(productData, route.params.productId);
        router.push({ name: "admin" })
    } catch (err) {
        console.log(err);
    }
}

async function removeProduct() {
    try {
        await ProductService.removeProduct(route.params.productId);
        router.push({ name: "admin" });
    } catch (err) {
        console.log(err);
    }
}

onMounted(() => {
    if(!categoryStore.categories.length) {
        categoryStore.getCategories();
    }
   getProductData();
});
</script>

<template>
    <h1>Edit product</h1>
    <ProductForm
      v-if="product"
      :category-list="categoryStore.categories"
      :form-data="product"
      @sendProductData="updateProductData"
    />
    <button
      class="button button_danger"
      @click="removeProduct">Remove</button>
</template>