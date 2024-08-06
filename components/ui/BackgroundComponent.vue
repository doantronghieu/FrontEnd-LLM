<template>
  <div class="background">
    <!-- Background content goes here -->
  </div>
</template>

<script>
export default {
  name: 'BackgroundComponent',
};
</script>

<style scoped>
.background {
  background: linear-gradient(135deg, #ADD8E6 0%, #FFB6C1 100%);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  
}
</style>
