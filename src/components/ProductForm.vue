<script setup>
import { defineEmits, ref } from "vue";
import CustomInput from "./UI/CustomInput.vue";

const emits = defineEmits(["sendProductData"]);

const props = defineProps({
    categoryList: { type: Array, required: true },
    product: { type: Object, default: null },
});

const productData = ref(props.product || {
    name: "",
    description: "",
    price: 0,
    category_id: null,
    photo: {},
});

function updatePhoto(e) {
    if(!e.target.files.length) return;
    productData.value.photo = e.target.files[0];
}

function sendProductData() {
    const formData = new FormData();
    formData.append("name", productData.value.name);
    formData.append("description", productData.value.description);
    formData.append("price", productData.value.price);
    formData.append("category_id", productData.value.category_id);
    formData.append("photo", productData.value.photo);
    emits("sendProductData", formData);
}
</script>


<template>
    <form
      class="form"
      @submit.prevent="sendProductData"
    >
        <CustomInput
          type="text"
          placeholder="product name"
          v-model="productData.name"
        />
        <CustomInput
          type="text"
          placeholder="product description"
          v-model="productData.description"
        />
        <CustomInput
          type="number"
          min="0"
          placeholder="product price"
          v-model="productData.price"
        />
        <select
          v-model="productData.category_id"
          required
        >
            <option disabled>Category</option>
            <option
                v-for="category in categoryList"
                :key="category.id"
                :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>
        <input
          type="file"
          accept="image/*"
          @change="updatePhoto"
          :required="!product"
        />
        <button
          class="button button_success"
        >
            {{  product ? "Update" : "Add" }}
        </button>
    </form>
</template>