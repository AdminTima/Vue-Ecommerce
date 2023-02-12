<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "./store/userStore";
import TheLoader from "./components/UI/TheLoader.vue";
import TheNavbar from "./components/TheNavbar.vue";

const userStore = useUserStore();

const isLoading = ref(true);


onMounted(async () => {
    if(localStorage.getItem("refreshToken")) {
        await userStore.checkUserAuth();
    }
    isLoading.value = false;
});
</script>

<template>
    <div class="app">
        <TheNavbar/>
        <TheLoader v-if="isLoading"/>
        <RouterView v-else/>
    </div>
</template>

<style>
.app {
    padding: 100px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>