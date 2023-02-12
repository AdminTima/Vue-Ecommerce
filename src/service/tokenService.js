



export class TokenService {

    static saveTokens(tokens) {
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
    }

    static removeTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

}