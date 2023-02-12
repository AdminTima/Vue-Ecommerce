import { authApi } from "../api/axiosConfig";
import { CART_API, CART_BUY_API } from "../api/apiRoutes";


export class CartService {

    static async getUserCart() {
        const response = await authApi.get(CART_API);
        console.log(response);
        return response.data;
    }

    static async addCartItem(productData) {
        const response = await authApi.post(CART_API, productData);
        console.log(response);
        return response.data;
    }

    static async removeCartItem(cardItemId) {
        const response = await authApi.delete(`${CART_API}/${cardItemId}`);
        console.log(response);
        return response.data;
    }





    static async updateCartItemProductAmount(cardItemId, amount) {
        const response = await authApi.put(`${CART_API}/${cardItemId}`, {
            amount,
        });
        console.log(response);
        return response.data;
    }

    static async buy() {
        const response = await authApi.get(CART_BUY_API);
        console.log(response);
        return response.data;
    }
}