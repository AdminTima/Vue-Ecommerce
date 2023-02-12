import { api, authApi } from "../api/axiosConfig";
import { USER_API, USER_CHANGE_PASSWORD_API, USER_UPDATE_API } from "../api/apiRoutes";
import { TokenService } from "./tokenService";


export class UserService {

    static async registerUser(userData) {
        const response = await api.post(USER_API, userData);
        console.log(response);
        return response.data;
    }

    static async removeUser() {
        const response = await authApi.delete(USER_API);
        console.log(response);
        TokenService.removeTokens();
        return response.data;
    }

    static async updateUserData(updatedData) {
        const response = await authApi.put(USER_UPDATE_API, updatedData);
        console.log(response);
        TokenService.removeTokens();
        return response.data;
    }

    static async changePassword(data) {
        const response = await authApi.put(USER_CHANGE_PASSWORD_API, data);
        console.log(response);
        TokenService.removeTokens();
        return response.data;
    }

}