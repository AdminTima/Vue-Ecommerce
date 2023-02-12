import { api, authApi } from "../api/axiosConfig";
import {
    REFRESH_TOKENS_API,
    LOGIN_API,
    LOGOUT_API,
} from "../api/apiRoutes";
import jwt_decode from "jwt-decode";
import { TokenService } from "./tokenService";

export class AuthService {

    static async login(userData) {
        const response = await api.post(LOGIN_API, userData);
        console.log(response);
        TokenService.saveTokens(response.data);
        return jwt_decode(response.data.access);

    }

    static async refreshTokens() {
        const response = await api.post(REFRESH_TOKENS_API, {
            refresh: localStorage.getItem("refreshToken"),
        });
        console.log(response);
        TokenService.saveTokens(response.data);
        return jwt_decode(response.data.access);
    }

    static async logoutUser() {
        const response = await authApi.get(LOGOUT_API);
        console.log(response);
        TokenService.removeTokens();
        return response.data;
    }

}