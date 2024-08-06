<template>
  <div class="background">
    <div class="background-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundComponent',
};
</script>

<style scoped>
.background {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  animation: gradientAnimation 10s ease infinite;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="10" cy="10" r="1" fill="%23ffffff" fill-opacity="0.1"/%3E%3C/svg%3E');
  animation: particleAnimation 60s linear infinite;
}

@keyframes particleAnimation {
  0% { background-position: 0 0; }
  100% { background-position: 1000px 1000px; }
}

/* Add responsive adjustments */
@media (max-width: 768px) {
  .background {
    animation: gradientAnimation 15s ease infinite;
  }
}
</style>