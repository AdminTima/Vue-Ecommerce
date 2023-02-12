import { defineStore } from "pinia/dist/pinia";
import { ref } from "vue";
import { AuthService } from "../service/authService";
import { UserService } from "../service/userService";
import { TokenService } from "../service/tokenService";


export const useUserStore = defineStore("userStore", () => {
    const isAuth = ref(!!localStorage.getItem("accessToken"));
    const user = ref(null);

    async function register(userData) {
        return await UserService.registerUser(userData);
    }

    async function login(userData) {
        const decodedData = await AuthService.login(userData);
        isAuth.value = true;
        user.value = decodedData;
    }

    async function checkUserAuth() {
        try {
            const decodedData = await AuthService.refreshTokens();
            isAuth.value = true;
            user.value = decodedData;
        } catch (err) {
            console.log(err);
            isAuth.value = false;
            user.value = null;
            TokenService.removeTokens();
        }
    }

    async function logout() {
        try {
            isAuth.value = false;
            user.value = null;
            return AuthService.logoutUser();
        } catch (err) {
            console.log(err);
        }
    }

    async function removeUser() {
        try {
            isAuth.value = false;
            user.value = null;
            return UserService.removeUser();
        } catch (err) {
            console.log(err);
        }
    }

    async function updateUserData(updatedData) {
        await UserService.updateUserData(updatedData);
        isAuth.value = false;
        user.value = null;
    }

    async function changePassword(passwordData) {
        await UserService.changePassword(passwordData);
        isAuth.value = false;
        user.value = null;
    }
    return {
        isAuth,
        user,
        register,
        login,
        checkUserAuth,
        removeUser,
        logout,
        changePassword,
        updateUserData,
    };
});