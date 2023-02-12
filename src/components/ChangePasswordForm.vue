<script setup>
import { ref } from "vue";

const emits = defineEmits(["sendPasswordData", "update:error"]);

const oldPassword = ref("");
const newPassword = ref("");

function checkPasswordData(e) {
    if(!e.target.checkValidity()) return;
    if(oldPassword.value === newPassword.value) {
        emits("update:error", "New password must be different from old password");
        return false;
    }
    return true;
}

function sendPasswordData(e) {
    if(!checkPasswordData(e)) return;
    emits("sendPasswordData", {
        old_password: oldPassword.value,
        new_password: newPassword.value,
    }
    );
}
</script>

<template>
    <form @submit.prevent="sendPasswordData" class="form">
        <CustomInput
          class="input"
          type="password"
          placeholder="Old password"
          v-model="oldPassword"
          required
        />
        <CustomInput
          class="input"
          type="password"
          placeholder="New password"
          v-model="newPassword"
          required
        />
        <button class="button button_success">Change</button>
    </form>
</template>