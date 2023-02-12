<script setup>
import AuthForm from "../components/AuthForm.vue";
import { useUserStore } from "../store/userStore";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { LOGIN_ROUTE, REGISTER_ROUTE, PROFILE_ROUTE } from "../router/routes";
import { useRouter } from "vue-router/dist/vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const isRegisterPage = ref(route.name === REGISTER_ROUTE.name);
const error = ref("");

async function auth(userData) {
    console.log(isRegisterPage.value, "is register page");
    try {
        if(isRegisterPage.value) {
            await userStore.register(userData);
            router.push({ name: LOGIN_ROUTE.name })
        } else {
            await userStore.login(userData);
            router.push({ name: PROFILE_ROUTE.name })
        }
        error.value = "";
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

watch(() => route.name, (currentRoute) => {
    isRegisterPage.value = currentRoute === REGISTER_ROUTE.name;
});

</script>

<template>
    <div class="auth-page">
        <h2
          v-if="userStore.user"
        >
            Hello : {{ userStore.user.email }}: id{{ userStore.user.id }}
        </h2>
        <AuthForm
          v-model:error="error"
          @form-submit="auth"
          :error="error"
          :is-register-page="isRegisterPage"
        />
    </div>
</template>