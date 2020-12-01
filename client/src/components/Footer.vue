<template>
<div class="footer">

      <div class="icones">
        <div class="row">
        
          <div class="col-sm-2">
          </div>
          
          <div class="col-sm-1">
            <a href= "https://www.meteofrance.fr/" target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img  src="images/meteo_france_logo.png" class="icone"></i></a>
          </div>

          <div class="col-sm-1">
            <a href= "http://www.acta.asso.fr/" target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img src="images/acta_logo.png" ></i></a>
          </div> 

          <div class="col-sm-1">
            <a href= "https://www.vignevin.com/" target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img  src="images/ifv.png" class="icone"></i></a>
          </div>



          <div class="col-sm-1">
            <a href= "https://www.arvalisinstitutduvegetal.fr/" target="_blank" class="btn-floating btn-sm btn-fb mx-1" ><i><img src="images/arvalis_logo.png" ></i></a>
          </div>

          <div class="col-sm-1">
            <a href= "https://www.hdigitag.fr/fr/ " target="_blank" class=" btn-floating btn-sm btn-fb mx-1 " ><i><img src="images/logoDigitAg-reserve.png" ></i></a>
          </div>
          <div class="col-sm-1">
            <a href="http://www.inrae.fr" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo-INRAE_Transparent.png" ></i></a>
          </div>
          <div class="col-sm-1">
            <a href= "https://muse.edu.umontpellier.fr/" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo_MUSE.png" ></i></a>
          </div>

          <div class="col-sm-3">
          </div>

        </div>

      </div>

      <div class="copyright">
        <div class="row">
          <div class="col-sm-12">
            Copyright &copy; 2020: <a href="https://inrae.fr" target="_blank">  www.inrae.fr </a> | <a href="https://www.hdigitag.fr/fr/" target="_blank"> www.hdigitag.fr</a> & <a  href="#/legalMentions" target="_blank">  Mentions Légales | Politique de confidentialité</a>
          </div>
        </div>
      </div>
</div>
</template>

<script>
  export default {
    name: 'Footer',
    components: {
    }
  }
</script>

<style scoped>

.copyright{background: black; 

  text-align: center;
  font-size: .8em;
  color: white;
  height: 3vh;}

img {
  border-radius: 0%;
}

.icones{background: gray;  width: 100%; padding:3px; height: 5vh;}
.icones p {text-align:center;}
.icones img {max-width: 10vh; height: 4vh; }
.icones img:hover {max-width: 12vh;height: 5vh;}


</style>