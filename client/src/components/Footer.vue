<template>
<div class="footer">

      <div class="icones">
        <div class="row">
        
        <div class="col-sm-4">
          <a href= "https://www.hdigitag.fr/fr/ " target="_blank" class=" btn-floating btn-sm btn-fb mx-1 " ><i><img src="images/logoDigitAg-reserve.png" ></i></a>
        </div>
        <div class="col-sm-4">
          <a href="http://www.inrae.fr" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo-INRAE_Transparent.png" ></i></a>
        </div>
        <div class="col-sm-4">
          <a href= "https://muse.edu.umontpellier.fr/" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo_MUSE.png" ></i></a>
        </div>
        </div>
      </div>

      <div class="copyright">
        Copyright &copy; 2020: <a href="https://inrae.fr" target="_blank">  www.inrae.fr </a> | <a href="https://www.hdigitag.fr/fr/" target="_blank"> www.hdigitag.fr</a> & <a  href="#/legalMentions" target="_blank">  Mentions Légales | Politique de confidentialité</a>
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
  font-size: 1em;
  color: white;
  height: 3vh;}

img {
  border-radius: 0%;
}

.icones{background: gray;padding: 7px; width: 100%; height: 5vh;}
.icones p {text-align:center;}
.icones img {max-width: 10vh; height: 4vh; }
.icones img:hover {max-width: 12vh;height: 5vh;}


</style>