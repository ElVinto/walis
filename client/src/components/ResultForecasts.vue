<template>

  

    <div  v-if="$store.getters.getDataAreLoaded"> 

      

      <div class="row"> 
          <div id="selectors" class="col-sm-3">
              <p style="margin-top:5px"><b> WALIS-PE</b></p>
          </div>
            
            <button type="button" class="btn btn-secondary col-sm-3" v-on:click="displayLineCharts()" style= "outline-style:solid; outline-color:white; outline-width:1px" >
              Courbes 
            </button>
          
          
            <button id="bEnvelop" type="button" class="btn btn-secondary col-sm-3" v-on:click="displayEnvelopCharts()" style= "outline-style:solid; outline-color:white; outline-width:1px" >
              Enveloppe 
            </button>
            
            
            <button id ="bHistogram" type="button" class="btn btn-secondary col-sm-3" v-on:click="displayHistogramCharts()" style= "outline-style:solid; outline-color:white; outline-width:1px" >
              Quartiles
            </button>
            
      </div>
        
      <div class ="row" >

        <div id="selectors" class="col-sm-3">

          <div id="locNames"  >
            <!-- <p><b> Lieu : </b></p> -->

            <div class="row">
              <div class="btn-primary col-sm-12" style="text-align:centre">
              Lieu
                </div>
            </div>
            
            <br>
            
            <b-list-group style="align-centre">
              <b-list-group-item button
                v-for="locName in $store.getters.getLocNames"
                v-bind:key="locName"
                v-on:click="$store.commit('setSelectedLocName',locName)"
              >
                  {{ locName}}
              </b-list-group-item>
            </b-list-group>

          </div>

          <hr/>

          <div id="period"  > 

            <div class="row">
              <div class="btn-primary col-sm-12" style="text-align:centre">
              Période
                </div>
            </div>
            
            <br>
            <!-- <p><b> Période </b></p> -->
          
            <div id="startDateInterval" class ="row" >

              <div class = "col-sm-2">
                du
              </div>

              <div id="startDate" class = "col-sm-10">
                <select v-model="$store.state.selectedStartingDate" class="custom-select" style="font-size:x-small" >
                    <option 
                    v-for="(date, index) in $store.getters.getDates"
                    v-bind:key="index"
                    v-bind:value="date">
                      {{ date }}
                    </option>
                </select>
              </div>
            </div>

            <div id="endDateInterval" class ="row" >
              <div class = "col-sm-2">
                au
              </div>

              <div id="endDate" class = "col-sm-10">  
                
                <select v-model="$store.state.selectedEndingDate" class="custom-select"  style="font-size:x-small" >
                    <option 
                    v-for="(date, index) in $store.getters.getDates"
                    v-bind:key="index"
                    v-bind:value="date">
                      {{ date }}
                    </option>
                </select>
              </div>
            </div>
            
          </div>  

          <hr>
          <div id="targetingDate" > 
            
            <!-- <p><b> Centrer autour </b></p> -->

            <div class="row">
              <div class="btn-primary col-sm-12" style="text-align:centre">
              Centrer autour
                </div>
            </div>

            <br>
            
            <div id="arroundDate" class ="row" >

              <div class = "col-sm-2"  >
                du
              </div>

              <div id="targetdate" class = "col-sm-10">
                <select v-model="selectedTargetDate" class="custom-select" style="font-size:x-small" >
                    <option 
                    v-for="(date, index) in $store.getters.getDates"
                    v-bind:key="index"
                    v-bind:value="date">
                      {{ date }}
                    </option>
                </select>
              </div>
            </div>

            <div id="arroundDateNbDays" class ="row" >

              <div class = "col-sm-2"  >
                +/-
              </div>

              <div class = "col-sm-8" style="font-size:x-small" >
                7 jours 
              </div>
            </div>
            
          </div>  
          
          <hr/>

          <div class="row">
              <div class="btn btn-secondary col-sm-12" v-on:click="reInitDates()" style="text-align:centre">
              Réinitialiser
                </div>
            </div>

        </div>

      
        <div id="" class="col-sm-9">
          <div v-if="$store.getters.getSelectedLocName && $store.getters.getSelectedStartingDate" >

            <div v-if= "displayLines">
              <b>{{ ` Ensemble de prévisions pour  ${$store.getters.getSelectedLocName} du ${$store.getters.getSelectedStartingDate} au ${$store.getters.getSelectedEndingDate}`}} </b>

              <ForecastsLineChart v-bind:forecastParams="fInputParams_1"></ForecastsLineChart> 


            </div>

            <div v-if= "displayEnvelop">
              <b>{{ ` Enveloppe des prévisions pour  ${$store.getters.getSelectedLocName} du ${$store.getters.getSelectedStartingDate} au ${$store.getters.getSelectedEndingDate}`}} </b>

              <ForecastEnvelopChart v-bind:forecastParams="fInputParams_3"></ForecastEnvelopChart> 


            </div>

            <div v-if= "displayHistogram">
              <b>{{ ` Quartiles des prévisions pour  ${$store.getters.getSelectedLocName} du ${$store.getters.getSelectedStartingDate} au ${$store.getters.getSelectedEndingDate}`}} </b>

              <!-- <LineChart></LineChart> -->

              <CandleStickHighChart v-bind:forecastParams="fInputParams_3"></CandleStickHighChart> 
              

            </div>
            
          </div>

        </div>
      </div>

    </div>

  
</template>
<script>

// 

// import ServerServices from "../services/ServerServices"

import ForecastsLineChart from "./ForecastsLineChart";
import ForecastEnvelopChart from "./ForecastEnvelopChart";

// import LineChart from "./LineChart"
import CandleStickHighChart from "./CandleStickHighChart"


export default {
  name: 'InputForecasts',

   data() {
      return {

        selectedTargetDate: null,

        displayLines: true,
        displayEnvelop: false,
        displayHistogram: false,

        fInputParams_1:{
          inout:'result',
          meas:'FTSWtots'
        },

        

        fInputParams_3:{
          inout:'resultStat',
          meas: 'FTSWtot'
        },

        
    }
   },

  components: {
    ForecastsLineChart,
    ForecastEnvelopChart,
    // LineChart,
    CandleStickHighChart

  },

  async created() {
    console.log("START created InputForecasts  initAllForecasts")
    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initAllForecasts');
    }
    console.log("END created InputForecasts  initAllForecasts")
  },

  async mounted() {
    // if (!this.$store.getters.getDataAreLoaded) {
    //   await this.$store.dispatch('initModelUnits');
    // }
  },

  computed:{

  },

  methods: {


    selectLocName: function (locName){
      this.$store.setSelectedLocName (locName);
    },

    displayLineCharts: function() {
      this.displayLines= true;
      this.displayEnvelop= false;
      this.displayHistogram= false;
    },

    displayEnvelopCharts: function() {
      this.displayLines= false;
      this.displayEnvelop= true;
      this.displayHistogram= false;
    },

    displayHistogramCharts: function() {
      this.displayLines= false;
      this.displayEnvelop= false;
      this.displayHistogram= true;
    },

    reInitDates: function(){
      this.$store.state.selectedStartingDate= '2019-03-29';
      this.$store.state.selectedEndingDate= '2019-07-15';
    },
    
  },

  watch:{

    selectedTargetDate(newDate){
      console.log("START WATCH selectedTargetDate")
      if(newDate != null){

        const dates = this.$store.getters.getDates;
        const idx = dates.indexOf(newDate)
        console.log(`index of newDate ${newDate} : ${idx}`)

        const newStartingDateIdx = Math.max(0, idx-7);

        const newEndingingDateIdx = Math.min(dates.length -1, idx+7);


        this.$store.commit('setSelectedStartingDate', dates[newStartingDateIdx])
        this.$store.commit('setSelectedEndingDate', dates[newEndingingDateIdx])

        console.log(`this.$store.state.selectedStartingDate: ${this.$store.state.selectedStartingDate} `)
        console.log(`this.$store.state.selectedEndingDate: ${this.$store.state.selectedEndingDate} `)

      }

      console.log("End WATCH selectedTargetDate")
    },

    


  }



}
</script>

<style scoped>

p{
  text-align: center;
}

select{
  text-align: center;
  text-align-last: center;
}

#locNames{
  /* border-style: solid;
  border-width: 1px;
  border-color: lightgrey; */
  font-size:small
}

#period{
  font-size: small;
}

#startDate{
  font-size: x-small;
}

#selectors{
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
}

.item {text-align : center; margin-left: auto ;  margin-right: auto;margin-bottom: 0px; margin-top: 0px; width: 300px ;height: 200px; padding: 0px;}

</style>
