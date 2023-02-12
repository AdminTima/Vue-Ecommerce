<script setup>
const emits = defineEmits(["update:isVisible"]);

const props = defineProps({
    isVisible: { type: Boolean, default: false },
});

function hideModalWindow() {
    emits("update:isVisible", false);
}
</script>

<template>
    <div
      v-if="isVisible"
      class="modal-window"
      @click="hideModalWindow"
    >
        <div
          class="modal-window__content"
          @click.stop
        >
            <slot></slot>
        </div>
    </div>
</template>

<style>
.modal-window {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-window__content {
    min-height: 250px;
    min-width: 350px;
    background-color: #f5e5c6;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 15px;
}
</style>