<script setup>
import {useRoute} from "vue-router";

const route = useRoute();

</script>

<template>
    <h1 class="header">Not found. 404! {{ route.path }}</h1>
</template>