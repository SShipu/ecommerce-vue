<template>
  <div class="toast" :class="`toast-${optionsType}`" v-if="show">
    {{ message }}
  </div>
</template>

<script setup>
const message = ref("");// Ref for the toast message
const optionsType = ref("default");// Ref for the toast type
const show = ref(false);// Ref for controlling toast visibility

// Function to display toast message with specified text, type, and duration
const showToast = (text, duration, type) => {
  optionsType.value = type;
  message.value = text;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, duration);
};

// Toast functions for different types
const createToastFunction = (type, duration) => {
  return (text) => {
    showToast(text, duration, type);
  };
};

const success = createToastFunction('success', 3000); // Set specific duration for success toast
const error = createToastFunction('error', 3000); // Set specific duration for error toast
const info = createToastFunction('info', 3000); // Set specific duration for info toast
const warning = createToastFunction('warning', 3000); // Set specific duration for warning toast

defineExpose({
  success,
  error,
  info,
  warning,
});
</script>

<style scoped>
/* Toast type-specific styles */
.toast-success {
  background-color: #28a745;
}

.toast-info {
  background-color: #17a2b8;
}

.toast-warning {
  background-color: #ffc107;
  color: #000 !important;
}

.toast-error {
  background-color: #dc3545;
}

.toast-default {
  background-color: #343a40;
}

/* Common toast styles */
.toast {
  opacity: 1 !important;
  padding: 1rem 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  position: fixed;
  bottom: 5%;
  right: 3%;
  width: auto;
  color: #fff;
  z-index: 999;
  animation-duration: .15s;
  display: block !important;
}
.toast:not(.show) {
    display: block !important;
}
</style>
