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
  background: linear-gradient(135deg, #4a90e2 0%, #f39c12 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>