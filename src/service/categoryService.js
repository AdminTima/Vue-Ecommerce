import { authApi } from "../api/axiosConfig";
import { CATEGORY_API } from "../api/apiRoutes";


export class CategoryService {

    static async getAllCategories() {
        const response = await authApi.get(CATEGORY_API);
        console.log(response);
        return response.data;
    }

    static async addCategory(categoryData) {
        const response = await authApi.post(CATEGORY_API, categoryData);
        console.log(response);
        return response.data;
    }

    static async updateCategory(categoryId, categoryData) {
        const response = await authApi.put(`${CATEGORY_API}/${categoryId}`, categoryData);
        console.log(response);
        return response.data;
    }

    static async removeCategory(categoryId) {
        const response = await authApi.delete(`${CATEGORY_API}/${categoryId}`);
        console.log(response);
        return response.data;
    }
}