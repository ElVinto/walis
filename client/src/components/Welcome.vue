<template>
  <div
    
    style="background-image:url(images/anemometer-3977718_1920.jpg); background-size: 100% 100%; padding:0px;margin: 1px; height: 80vh"
    
    >
 
</div>
  
   
</template>
<script>



export default {
  name: 'Welcome',

   data() {
      return {
        
      }
    },

  components: {
    

  },

  async created() {
    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initAllForecasts');
    }
  },

  async mounted() {
      // if (!this.$store.getters.getDataAreLoaded) {
      //   await this.$store.dispatch('initAllForecasts');
      // }
  }

}
</script>

<style scoped>


</style>
