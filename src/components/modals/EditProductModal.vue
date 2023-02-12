<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router/dist/vue-router";
import ProductForm from "../../components/ProductForm.vue";
import { useCategoryStore } from "../../store/categoryStore";
import { useProductStore } from "../../store/productStore";
import RemoveModal from "./RemoveModal.vue";

const props = defineProps({
    product: { type: Object, required: true },
});
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const productData = ref();
const showEditProductModal = ref(false);
const error = ref("");


async function updateProductData(updatedData) {
    try {
        productStore.updateProduct(props.product.id, updatedData);
        showEditProductModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

async function removeProduct() {
    try {
        productStore.removeProduct(props.product.id);
        showEditProductModal.value = false;
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

watch(showEditProductModal, (cur) => {
    if(cur) {
        if(!categoryStore.categories.length) {
            categoryStore.getCategories();
        }
        productData.value = JSON.parse(JSON.stringify(props.product));
    }
});
</script>

<template>
    <ModalWindow v-model:is-visible="showEditProductModal">
        <h1>Edit product</h1>
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <ProductForm
          v-if="product"
          :category-list="categoryStore.categories"
          :product="productData"
          @sendProductData="updateProductData"
          :update="true"
        />
        <RemoveModal
          :obj="productData.name"
          :handle-remove-func="removeProduct"
        />
    </ModalWindow>
    <button
      class="button button_info"
      @click="showEditProductModal=true"
    >
        Edit
    </button>
</template>