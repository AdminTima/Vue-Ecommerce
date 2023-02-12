<script setup>
import { LOGIN_ROUTE } from "../../router/routes";
import { ref } from "vue";
import { useRouter } from "vue-router/dist/vue-router";
import { useUserStore } from "../../store/userStore";
import ChangePasswordForm from "../ChangePasswordForm.vue";

const router = useRouter();
const userStore = useUserStore();

const error = ref("");
const showChangePasswordModal = ref(false);



async function changePassword(passwordData) {
    try {
        await userStore.changePassword(passwordData);
        router.push({ name: LOGIN_ROUTE.name });
    } catch (err) {
        console.log(err);
        error.value = err.response?.data;
    }
}
</script>

<template>
    <ModalWindow v-model:isVisible="showChangePasswordModal">
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <ChangePasswordForm
          v-model:error="error"
          @send-password-data="changePassword"
        />
    </ModalWindow>
    <button
      class="button button_info"
      @click="showChangePasswordModal=true"
    >
        Change password
    </button>
</template>