import { createRouter, createWebHistory } from "vue-router/dist/vue-router";
import { useUserStore } from "../store/userStore";
import { routes, notAuthRoutes } from "./routes";


export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const userStore = useUserStore();
    const isAuth = userStore.isAuth;
    console.log(isAuth);
    if (!isAuth && !notAuthRoutes.includes(to.name)) {
        return { name: "login" };
    }
});
