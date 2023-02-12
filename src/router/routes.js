import MainPage from "../pages/MainPage.vue";
import AuthPage from "../pages/AuthPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import CartPage from "../pages/CartPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import jwt_decode from "jwt-decode";
import EditProductPage from "../pages/EditProductPage.vue";


function checkIfUserIsAdmin(to, from) {
        const token = localStorage.getItem("accessToken");
        const { is_staff } = jwt_decode(token);
        if(!is_staff) {
            return { name: "profile" }
        }
}

export const LOGIN_ROUTE = {
        path: "/login",
        name: "login",
        component: AuthPage,
    };

export const REGISTER_ROUTE = {
        path: "/register",
        name: "register",
        component: AuthPage,
    };

export const MAIN_ROUTE = {
        path: "/",
        name: "main",
        component: MainPage,
    };

export const PRODUCT_ROUTE = {
        path: "/product/:productId",
        name: "product",
        component: ProductDetailPage,
    };

export const PROFILE_ROUTE = {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
    };

export const CART_ROUTE = {
        path: "/cart",
        name: "cart",
        component: CartPage,
    };

export const ADMIN_ROUTE =  {
        path: "/admin",
        name: "admin",
        component: AdminPage,
        beforeEnter: checkIfUserIsAdmin,
    };

export const EDIT_PRODUCT_ROUTE = {
        path: "/edit-product/:productId",
        name: "edit-product",
        component: EditProductPage,
        beforeEnter: checkIfUserIsAdmin,
    };

export const NOT_FOUND_ROUTE = {
    path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFoundPage,
    };


export const routes = [
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    ADMIN_ROUTE,
    MAIN_ROUTE,
    CART_ROUTE,
    EDIT_PRODUCT_ROUTE,
    PRODUCT_ROUTE,
    PROFILE_ROUTE,
    NOT_FOUND_ROUTE,
];

export const notAuthRoutes = [
    LOGIN_ROUTE.name,
    REGISTER_ROUTE.name,
    NOT_FOUND_ROUTE.name,
]

