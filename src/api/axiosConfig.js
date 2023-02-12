import axios from "axios";
import { BASE_API, REFRESH_TOKENS_API } from "./apiRoutes";
import { TokenService } from "../service/tokenService";


const api = axios.create({
    baseURL: BASE_API,
});

const authApi = axios.create({
    baseURL: BASE_API,
});

authApi.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
})

authApi.interceptors.response.use(config => {
    return config;
}, async error => {
        console.log(error);
        const initialRequest = error.config;
        if(initialRequest && error.response.status === 401 && !initialRequest.isRetry) {
            try {
                initialRequest.isRetry = true;
                const response = await api.post(REFRESH_TOKENS_API, {
                    refresh: localStorage.getItem("refreshToken"),
                });
                TokenService.saveTokens(response.data);
                return authApi(initialRequest);
            } catch (err) {
                console.log(err);
                TokenService.removeTokens();
            }
        }
        throw error;
    }
);

export { authApi, api };