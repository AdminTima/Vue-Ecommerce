<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore";

const emits = defineEmits(["sendUserData"]);

const props = defineProps({
    error: { type: String, required: true },
});

const userStore = useUserStore();

const username = ref(userStore.user.username || "");
const email = ref(userStore.user.email || "");

function sendUserData(e) {
    if(!e.target.checkValidity()) return;
    const oldUsername = userStore.user.username;
    const oldEmail = userStore.user.email;
    if(username.value === oldUsername && email.value === oldEmail) return;
    emits("sendUserData", {username: username.value, email: email.value});
}

</script>

<template>
    <form
      @submit.prevent="sendUserData"
      class="form"
    >
        <p
          class="error"
          v-if="error"
        >
            {{ error }}
        </p>
        <label class="form__label">Username: </label>
        <CustomInput v-model="username"/>
        <label class="form__label">Email: </label>
        <CustomInput v-model="email"/>
        <button class="button button_success">Update</button>
    </form>
</template>