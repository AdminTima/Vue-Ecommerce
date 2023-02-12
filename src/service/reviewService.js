import { authApi } from "../api/axiosConfig";
import { REVIEW_API } from "../api/apiRoutes";


export class ReviewService {

    static async createReview(reviewData) {
        const response = await authApi.post(REVIEW_API, reviewData);
        console.log(response);
        return response.data;
    }

    static async removeReview(reviewId) {
        const response = await authApi.delete(`${REVIEW_API}/${reviewId}`);
        console.log(response);
        return response.data;
    }

    static async updateReview(reviewId, reviewData) {
        const response = await authApi.put(`${REVIEW_API}/${reviewId}`, reviewData);
        console.log(response);
        return response.data;
    }

}