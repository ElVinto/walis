<template>
    <section class="charts">
      <vue-highcharts :options="options" :highcharts="Highcharts" ref="candleStickChart"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import Exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts/highstock";
// import * as data from "../assets/data.js";

Exporting(Highcharts);
export default {
  components: {
    VueHighcharts
  },

  props: ['forecastParams'],

  data() {
    return {


      serieData :{
        type: "candlestick",
        name: `${this.forecastParams.meas} Forecast`,
        data: []
      },

      options: {

        chart: {
          type: "candlestick"
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
          },

        yAxis: {
          opposite: true,
          title: {
              text: `${this.forecastParams.meas} Forecast`,
          }
        },

        legend: {
            enabled: false
        },

        title: {
          text: `${this.forecastParams.meas} Forecast`
        },

        tooltip: {
            // shared: true,
            useHTML: true,
            // headerFormat: '<b>{series.name} boom</b><br>',
            pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/> Max: {point.high}<br/> Q3: {point.close}<br/> Q1: {point.open}<br/> Min: {point.low}<br/>'
            
        },

        

        series: [
          {
          type: "candlestick",
          name: `${this.forecastParams.meas} Forecast`,
          data: [],

          }
        ]
      },

      Highcharts: Highcharts

    };
  },

  mounted() {
    this.load()
  },

  methods: {
    load() {
      
      const forecastMeas = this.selectForecastMeas(this.selectedData);
      this.$refs.candleStickChart.removeSeries()
      this.$refs.candleStickChart.addSeries(forecastMeas)

    },

    selectForecastMeas: function(selected_data){
      
      console.log(' START Candlestick selectForecastData')

      let forecastMeas = {
        type: "candlestick",
        name: `${this.forecastParams.meas} Forecast`,
        data: []
      }

      const dates = this.$store.getters.getDates

      const idxStartingDate = dates.indexOf(selected_data.selectedStartingDate)
      console.log(` idxStartingDate: ${idxStartingDate}`)

      const idxEndingDate = dates.indexOf(selected_data.selectedEndingDate)
      console.log(` idxEndingDate: ${idxEndingDate}`)

      // const locForecasts = this.$store.getters.getAllForecasts[selected_data.selectedLocName]


      for(let idx= idxStartingDate; idx <= idxEndingDate; idx++){
        forecastMeas.data.push([
          new Date(dates[idx]).getTime(),
          this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p25[idx],
          this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p100[idx],
          this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p0[idx],
          this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p75[idx]
        ])
      }       
      
      console.log('forecastMeas')
      console.log(forecastMeas)

      console.log(' END Candlestick selectForecastData')
      return forecastMeas;
    },

  },

   computed: {
        
        selectedData:{
            get(){
                const selected_data ={
                    selectedLocName : this.$store.getters.getSelectedLocName,
                    selectedStartingDate : this.$store.getters.getSelectedStartingDate,
                    selectedEndingDate : this.$store.getters.getSelectedEndingDate
                }
                return selected_data;
            }
        }
    },

    watch: {
        selectedData(newVal){
            
            console.log(' START watch Candle Stick  selected data');
            
            console.log('newVal: ');
            console.log(newVal);


            const forecastMeas = this.selectForecastMeas(newVal);
            

            console.log("this.$refs.candleStickChart")
            console.log(this.$refs.candleStickChart)

           
           this.$refs.candleStickChart.removeSeries();
           this.$refs.candleStickChart.addSeries(forecastMeas);
            

            console.log(' END watch Candle Stick selected data');

        },
    },
};
</script>
