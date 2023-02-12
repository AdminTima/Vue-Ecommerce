<script setup>
import {
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    CART_ROUTE,
    ADMIN_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
} from "../router/routes";
import { useUserStore } from "../store/userStore";


const userStore = useUserStore();
</script>

<template>
    <div class="navbar">
        <div v-if="userStore.isAuth" class="navbar__routes">
            <RouterLink
                class="button button_info navbar__item"
                :to="{name: CART_ROUTE.name}"
            >
                Cart
            </RouterLink>
            <RouterLink
              class="button button_info navbar__item"
              v-if="userStore.user?.is_staff"
              :to="{name: ADMIN_ROUTE.name}"
            >
                Admin
            </RouterLink>
            <RouterLink
              class="button button_info navbar__item"
              :to="{name: MAIN_ROUTE.name}"
            >
                Shop
            </RouterLink>
            <RouterLink
              class="button button_info navbar__item"
              :to="{name: PROFILE_ROUTE.name}"
            >
                Profile
            </RouterLink>
        </div>
        <div v-else class="navbar__routes">
            <RouterLink
              class="button button_info navbar__item"
              :to="{name: LOGIN_ROUTE.name}"
            >
                Login
            </RouterLink>
            <RouterLink
              class="button button_info navbar__item"
              :to="{name: REGISTER_ROUTE.name}"
            >
                Register
            </RouterLink>
        </div>
    </div>
</template>

<style>
.navbar {
    border: 2px solid lime;
    position: fixed;
    background-color: whitesmoke;
    top: 0;
    right: 0;
    left: 0;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    column-gap: 50px;
}

.navbar__item {
    flex-basis: 100%;
    text-align: center;
    margin: 10px;
}

.navbar__routes {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

</style>