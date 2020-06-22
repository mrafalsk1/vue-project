<template>
  <div>
    <div class="d-flex flex-row">
      <router-link to="/categorias" class="cat">Categorias</router-link>
    </div>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "topbarguest",
  data: function() {
    return {
      user: ''
    }
  }
};
</script>
<style scoped>
.cat {
  position: absolute;
  top: 20px;
  left: 30px;
}
.bg-white {
  background-color: white;
}
</style>