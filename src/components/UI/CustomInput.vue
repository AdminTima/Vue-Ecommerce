<script setup>
import { ref } from "vue";

const emits = defineEmits(["update:modelValue", "update:type"]);

const props = defineProps({
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number, Date] },
    required: { type: Boolean, default: true },
});

const inputType = ref(props.type);

function updateModelValue(e) {
    emits("update:modelValue", e.target.value);
}

function togglePasswordVisibility(e) {
    if(inputType.value === "password") {
        inputType.value = "text";
    } else {
        inputType.value = "password";
    }
}
</script>

<template>
    <input
      v-bind="$attrs"
      class="input"
      :type="inputType"
      :value="modelValue"
      @input="updateModelValue"
      :required="required"
    >
    <div
      class="input-eye"
      @click="togglePasswordVisibility"
      v-if="type === 'password'"
    >
        &#128065;
    </div>
</template>

<style>
.input-eye {
    cursor: pointer;
    font-size: 27px;
}
</style>