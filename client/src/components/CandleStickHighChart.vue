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
          selected: 1
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
            // formatter: function() {
            //   return '<b>{series.name}</b><br>';
            // }
            
        },

        

        series: [{
          type: "candlestick",
          name: `${this.forecastParams.meas} Forecast`,
          data: [

          //   [1296432000000,47.97,48.58,47.76,48.47],
          //   [1296518400000,48.76,49.38,48.71,49.29],
          //   [1296604800000,49.21,49.32,49.08,49.19],
          //   [1296691200000,49.11,49.18,48.36,49.06],
          //   [1296777600000,49.09,49.53,49.07,49.50],
          //   [1297036800000,49.70,50.46,49.66,50.27],
          ],

          // dataGrouping: {
          //     units: [
          //       [
          //         'week', // unit name
          //         [1] // allowed multiples
          //       ], [
          //         'month',
          //         [1, 2, 3, 4, 6]
          //       ]
          //     ]
          // }

          }]
      },

      Highcharts: Highcharts

    };
  },

  mounted() {
    this.load()
  },

  methods: {
    load() {
      // let candleStickCharts = this.$refs.candleStickCharts;
      

      // const dates = this.$store.getters.getDates
      
      // let newData =[]
      // for( let idx=0; idx< dates.length;idx++){
      //   newData.push([
      //     new Date(dates[idx]).getTime(),
      //     this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p25[idx],
      //     this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p100[idx],
      //     this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p0[idx],
      //     this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][this.forecastParams.meas].p75[idx]
      //   ])
      // }

      const forecastMeas = this.selectForecastMeas(this.selectedData);
      // this.options.series[0].data=newData;

      this.$refs.candleStickChart.removeSeries()

      this.$refs.candleStickChart.addSeries(forecastMeas)
    },

    selectForecastMeas: function(selected_data){
      
      console.log(' START selectForecastData')

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
            
            console.log('watch selected data');
            
            console.log('newVal: ');
            console.log(newVal);


            const forecastMeas = this.selectForecastMeas(newVal);
            
            this.$refs.candleStickChart.removeSeries()

            this.$refs.candleStickChart.addSeries(forecastMeas);

        },
    },
};
</script>
