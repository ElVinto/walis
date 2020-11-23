<template>
  <div class="topnav">
    <div class="row">
      
      <router-link to="/" class=" col-sm-3 nav-link" style= "outline-style:solid; outline-color:white; outline-width:1px" >
        <b> Accueil </b>
      </router-link>
      
      <router-link to="/InputForecasts" class=" col-sm-5 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Prévisions d'ensemble </b> 
      </router-link>

      <router-link to="/ResultForecasts" class=" col-sm-4 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Prévisions du modèle Walis </b> 
      </router-link>



    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  
  async created () {},
  methods: {},
};
</script>

<style scoped>

  .topnav {overflow: hidden;background-color: #333; width: 100%;}
  .topnav a {float: left;display: block;color: #f2f2f2;text-align: center; text-decoration: none;}
  
  .topnav a:hover {background-color:rgb(165, 161, 161);color: black;}

</style>
