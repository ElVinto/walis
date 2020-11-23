import { Line, mixins } from 'vue-chartjs'


export default {

    extends: Line,

    mixins: [mixins.reactiveData],

    name: "ForecastsLineChart",

    props: ['forecastParams'],

    data(){
        return{

            chartData: {
                labels: [],
                datasets: []
            },

            
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display:true,
                            fontSize: 7
                        },
                        ticks: {
                            autoSkip: false,
                            fullWidth: true,
                            //  suggestedMax: 14
                        }
                    }],
                    yAxes: [{
                        id: 'A',
                        type: 'linear',
                        position: 'left',
                        scaleLabel: {
                            display: true,
                            labelString: `${this.forecastParams.meas} Forecast`,
                            fontSize: 11
                        },
                        // ticks: {
                        //     max: 1,
                        //     min: 0
                        //     , stepSize: 0.25
                        // }
                    }]
                }
            },

            rand : {}

        }
    },

    created(){
        // this.initCharData()
    },

    mounted(){

        console.log(' START mounted ForecastsLineChart')

        console.log('forecastParams')
        console.log(this.forecastParams)

        this.initCharData()

        this.$nextTick(() => {
      
            this.renderChart(this.chartData,this.options)
      
          });
        
        console.log(' END mounted ForecastsLineChart')
      },

    methods:{


            
        selectForecastMeas: function(selected_data){
            console.log(' START selectForecastData')

            let forecastMeas = {
                date : [],
                member : {}
            }

            for(let m of this.$store.getters.getMembers){
                forecastMeas.member[m]=[]
            }

            const dates = this.$store.getters.getDates

            const idxStartingDate = dates.indexOf(selected_data.selectedStartingDate)
            console.log(` idxStartingDate: ${idxStartingDate}`)

            const idxEndingDate = dates.indexOf(selected_data.selectedEndingDate)
            console.log(` idxEndingDate: ${idxEndingDate}`)

            const locForecasts = this.$store.getters.getAllForecasts[selected_data.selectedLocName]

            for(let idx= idxStartingDate; idx <= idxEndingDate; idx++){
                forecastMeas['date'].push(dates[idx]);
                for(let m of this.$store.getters.getMembers){
                    forecastMeas.member[m].push(locForecasts[this.forecastParams.inout][m][this.forecastParams.meas][idx])
                }
                

            }       

            return forecastMeas;

        },

        initCharData: function (){

            this.rand  = require('random-seed').create()
            this.rand.seed(1)

            const forecastMeas = this.selectForecastMeas(this.selectedData);

            this.chartData.labels = forecastMeas.date

            
            
            for(let m of this.$store.getters.getMembers){
                this.chartData.datasets.push(
                    {
                        label: m,
                        yAxisID: 'A',
                        // data: this.$store.getters.getAllForecasts[this.$store.getters.getSelectedLocName][this.forecastParams.inout][m][this.forecastParams.meas],
                        data: forecastMeas.member[m],

                        fill: false,
                        borderColor: `${this.dynamicColors()}`,
                    }
                )
            }


        },

        dynamicColors : function() {

           var r = Math.floor(this.rand.random() * 255);
           var g = Math.floor(this.rand.random() * 255);
           var b = Math.floor(this.rand.random() * 255);

            return "rgb(" + r + "," + g + "," + b + ")";
         }
    },

    
    computed: {
        
        selectedData :{
            get(){


                let selected_data ={
                    selectedLocName : this.$store.getters.getSelectedLocName,
                    selectedStartingDate : this.$store.getters.getSelectedStartingDate,
                    selectedEndingDate : this.$store.getters.getSelectedEndingDate,

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

            this.chartData.labels = forecastMeas.date

            for(let m of this.$store.getters.getMembers){
                this.chartData.datasets[m].data = forecastMeas.member[m]
            }

            this.renderChart(this.chartData,this.options)
            
        },
    },    
}

