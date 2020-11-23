<template>

    <!-- Todo separate in 3 div and add a grid -->
  <div >
    <div  v-if="$store.getters.getCurrentNavPath==='/Catalog'" class="header" style="background-image:url(images/crop-2229_1920_pixabay.jpg) ; background-size: 100% 150px;"></div>
  </div>
   
</template>


<script>
export default {
    name: 'Header',

    components: {   
    },

  }


</script>

<style scoped>

.header {
  height: 150px; 
  width: 100%;
  text-align: center;
  color: whitesmoke;

}


  
</style>