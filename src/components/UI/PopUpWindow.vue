<script setup>
import { watch } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
    showTime: { type: Number, default: 2 },
    modelValue: { type: Boolean, required: true },
});

watch(() => props.modelValue, (cur) => {
    if(cur) {
        setTimeout(() => {
            emits("update:modelValue", false);
        }, props.showTime * 1000);
    }
});
</script>

<template>
    <div
      class="pop-up-window"
      v-if="modelValue"
    >
        <div class="pop-up-window__content">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.pop-up-window {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.pop-up-window__content {
    min-width: 100px;
    min-height: 50px;
    padding: 10px;
    background-color: aqua;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>