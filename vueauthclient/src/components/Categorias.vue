<template>
  <div>
    <p>dsadsadsa</p>
  </div>
</template>
<script>
export default {
      created() {
      console.log('alo');
      
    axios
      .get("/categorias")
      .then(response => {
        console.log(response);
      })
      .catch(errors => {
        console.log(errors);
      });
  },
  name: "Topbarguest"
};
</script>