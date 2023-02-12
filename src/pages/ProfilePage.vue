<script setup>
import UserForm from "../components/UserForm.vue";
import { useUserStore } from "../store/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router/dist/vue-router";
import { LOGIN_ROUTE } from "../router/routes";
import ChangePasswordModal from "../components/modals/ChangePasswordModal.vue";

const userStore = useUserStore();
const router = useRouter();

const error = ref("");

async function updateUserData(userData) {
    try {
        await userStore.updateUserData(userData);
        router.push({name: LOGIN_ROUTE.name});
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}

async function logout() {
    try {
        await userStore.logout();
        router.push({name: LOGIN_ROUTE.name});
    } catch (err) {
        console.log(err);
    }
}

async function removeUser() {
    try {
        await userStore.removeUser();
        router.push({name: LOGIN_ROUTE.name});
    } catch (err) {
        console.log(err);
    }
}
</script>

<template>
    <h1 class="header">Profile</h1>
    <div class="profile__buttons">
        <button
          class="button button_danger"
          @click="logout"
        >Logout</button>
        <button
          class="button button_danger"
          @click="removeUser"
        >Delete account</button>
    </div>
    <UserForm
      :error="error"
      @send-user-data="updateUserData"
    />
    <ChangePasswordModal/>
</template>

<style>
.profile__buttons {
    display: flex;
    column-gap: 20px;
    margin: 10px;
}
</style>