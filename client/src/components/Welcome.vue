<template>
  <div

    id="welcome" class="global" 
    style="background-image:url(images/anemometer-3977718_1920.jpg); background-size: 100% 100%; padding:0px;margin: 1px; height: 80vh"
    >

      <div id="title" >
        <router-link to="/InputForecasts" class="text-white"> <h1>WALIS-PE</h1></router-link>
      </div>

      <!-- <div id="btnScenario" style="width: auto; opacity:80%;">
        <b-button to="/InputForecasts" variant="dark" style="width: auto;">
          
          <h3>WALIS-PE</h3>
        </b-button>  
        <br>   
      </div> -->

      <div id="btnGuide">
        <b-button id="btnGuide" variant="dark" v-b-toggle.sidebar-footer style="opacity:80%">
            <!-- <img src="images/guid.png"/> -->
            Guide utilisateur
        </b-button>
      </div>

      <div id="objective" class="card bg-dark text-white" style="opacity:90%">
      
        <div class="card-body" >
          <p>
          <center><b >
            WALIS-PE : (A compléter)
          </b></center>
          </p>
          <p>
            Objectif
          </p>

          <p > 
            (A compléter) Expliquer les objectifs de l'application Walis-PE, les prévisions qui y sont calculées, comment et pourquoi sont elles utilisées. 
          </p>

          <!-- <p>
            
          </p> -->

          <p>Contacts : Ivana ALEKSOVSKA (ivana.aleksovka@acta.asso.fr), <br>
            Francois BRUN (francois.brun@acta.asso.fr),
            
          </p>

          <p>Développeur : Vincent ARMANT, INRAE</p>
        </div>

      </div>

      <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
    
    <template v-slot:footer="{ hide }">
      <b-button size="sm" @click="hide">Fermer</b-button>
    </template>

    <div class="px-3 py-2" >
      
      <h5>Bienvenue</h5><br>

      <p>
        (A compléter) Expliquer comment les  utilisateurs peuvent interagir avec l application.
      </p>
      
    </div>

  </b-sidebar>
  
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

#welcome{
  height: 90vh;
  width: 100%;
}

.card-body {  
  overflow-y: scroll; 
  width: 100%; 
  text-align: justify; 
  margin-top: 0px;
  font-size: medium;
  }


@media screen and (min-width: 900px) {
  .global {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);}
  
  #title {color:rgb(105, 103, 101);
    grid-column: 3;
    grid-row: 2;
  }

  #btnScenario { 
    width: auto;
    grid-column: 3 ;
    grid-row: 2;
  }

  #objective {
    grid-column: 2/5;
    grid-row: 5/6;
  }

  #btnGuide {
    grid-column: 3;
    grid-row: 3;
  }

}


</style>
