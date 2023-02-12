import { authApi } from "../api/axiosConfig";
import { PRODUCT_API } from "../api/apiRoutes";


export class ProductService {

    static async addProduct(productData) {
        const response = await authApi.post(PRODUCT_API, productData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        console.log(response);
        return response.data;
    }

    static async removeProduct(productId) {
        const response = await authApi.delete(`${PRODUCT_API}/${productId}`);
        console.log(response);
        return response.data;
    }

    static async updateProductData(updatedData, productId) {
        const response = await authApi.put(`${PRODUCT_API}/${productId}`, updatedData);
        console.log(response);
        return response.data;
    }

    static async getProducts() {
        const response = await authApi.get(PRODUCT_API);
        console.log(response);
        return response.data;
    }

    static async getProduct(productId) {
        const response = await authApi.get(`${PRODUCT_API}/${productId}`);
        console.log(response);
        return response.data;
    }
}