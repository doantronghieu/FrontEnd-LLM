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
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
