<script setup>
import { ref } from "vue";

const emits = defineEmits(["formSubmit", "update:error"]);

const props = defineProps({
    isRegisterPage: { type: Boolean, default: false },
    error: { type: String, required: true },
});

const userData = ref({
    username: "",
    email: "",
    password: "",
});
const passwordConfirm = ref("");


function checkPasswordsMatch() {
    if(userData.value.password !== passwordConfirm.value) {
        emits("update:error", "Passwords did not match");
        return false;
    }
    return true;
}

function sendData(e) {
    e.target.checkValidity();
    if(props.isRegisterPage && !checkPasswordsMatch()) {
        return;
    }
    emits("formSubmit", userData.value);
}
</script>

<template>
    <form
      class="form block-shadow_blue"
      @submit.prevent="sendData"
    >
        <p class="error" v-if="error">{{ error }}</p>

        <label
          v-if="isRegisterPage"
          class="form__label"
        >
            Username
        </label>
        <CustomInput
          v-if="isRegisterPage"
          placeholder="username"
          v-model="userData.username"
        />

        <label class="form__label">Email</label>
        <CustomInput
          placeholder="email"
          v-model="userData.email"
        />

        <label class="form__label">Password</label>
        <CustomInput
          type="password"
          placeholder="password"
          v-model="userData.password"
        />

        <label
          v-if="isRegisterPage"
          class="form__label"
        >
            Password confirm
        </label>
        <CustomInput
          v-if="isRegisterPage"
          type="password"
          placeholder="password confirm"
          v-model="passwordConfirm"
        />
        <button class="button button_success">Submit</button>
    </form>
</template>