import { defineStore } from "pinia/dist/pinia";
import { ProductService } from "../service/productService";
import { ref } from "vue";
import { ReviewService } from "../service/reviewService";


export const useProductStore = defineStore("productStore", () => {
    const products = ref([]);
    const product = ref(null);
    const productReviews = ref([]);

    async function getProduct(productId) {
        try {
            product.value = await ProductService.getProduct(productId);
            productReviews.value = product.value.reviews;
        } catch (err) {
            console.log(err);
        }
    }

    async function getProducts() {
        try {
            products.value = await ProductService.getProducts();
        } catch (err) {
            console.log(err);
        }
    }

    async function addProduct(productData) {
        const newProduct = await ProductService.addProduct(productData);
        products.value.unshift(newProduct);
    }

    async function createReview(reviewData) {
        const newReview = await ReviewService.createReview(
            {
                ...reviewData,
                product_id: product.value.id
            }
        );
        productReviews.value.unshift(newReview);
    }


    async function updateReview(reviewId, reviewData) {
            const updatedReview = await ReviewService.updateReview(reviewId, reviewData);
            const reviewIndex = productReviews.value.findIndex(
                review => review.id === reviewId
            );
            productReviews.value[reviewIndex] = updatedReview;
    }

    async function removeReview(reviewId) {
        await ReviewService.removeReview(reviewId);
        productReviews.value = productReviews.value.filter(
            review => review.id !== reviewId
        )
    }

    async function updateProduct(productId, updatedData) {
        const updatedProduct = await ProductService.updateProductData(updatedData, productId);
        const productIndex = products.value.findIndex(product => product.id === productId);
        products.value[productIndex] = updatedProduct;
    }

    async function removeProduct(productId) {
        await ProductService.removeProduct(productId);
        products.value = products.value.filter(product => product.id !== productId);
    }

    return {
        products,
        product,
        productReviews,
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        removeProduct,
        createReview,
        updateReview,
        removeReview,
    }
});