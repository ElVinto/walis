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

        }
    },

    created(){
        // this.initCharData()
    },

    mounted(){
        
        console.log(' START mounted ForecastsEnvelopChart')

        console.log('forecastParams')
        console.log(this.forecastParams)

        this.initCharData()

        this.$nextTick(() => {
      
            this.renderChart(this.chartData,this.options)
      
          });

        console.log(' END mounted ForecastsEnvelopChart')
      },

    methods:{

        selectForecastMeas: function(selected_data){
            console.log(' START selectForecastData')

            let forecastMeas = {}
            forecastMeas['date']=[]
            forecastMeas['min']=[]
            forecastMeas['max']=[]

            const dates = this.$store.getters.getDates

            const idxStartingDate = dates.indexOf(selected_data.selectedStartingDate)
            console.log(` idxStartingDate: ${idxStartingDate}`)

            const idxEndingDate = dates.indexOf(selected_data.selectedEndingDate)
            console.log(` idxEndingDate: ${idxEndingDate}`)

            const locForecasts = this.$store.getters.getAllForecasts[selected_data.selectedLocName]

            for(let idx= idxStartingDate; idx <= idxEndingDate; idx++){
                forecastMeas['date'].push(dates[idx]);
                forecastMeas['min'].push(locForecasts[this.forecastParams.inout][this.forecastParams.meas].p0[idx])
                forecastMeas['max'].push(locForecasts[this.forecastParams.inout][this.forecastParams.meas].p100[idx])

            }       
            
            return forecastMeas;
        },

        initCharData : function (){

            
            console.log(' START initCharData')
      
                        
            const forecastMeas = this.selectForecastMeas(this.selectedData);

            this.chartData.labels = forecastMeas.date;

            this.chartData.datasets.push(
                {
                    label: "min",
                    borderWidth: 0.7,
                    yAxisID: 'A',
                    data: forecastMeas['min'],
                    fill: false,
                    borderColor: "rgb(128,128,128)",
                }
            )

            this.chartData.datasets.push(
                {
                    label: "max",
                    borderWidth: 0.7,
                    yAxisID: 'A',
                    data: forecastMeas['max'],
                    fill: false,
                    borderColor: "rgb(0,0,0)",
                }
            )


            console.log(' END initCharData')


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

            this.chartData.labels = forecastMeas['date'];
            this.chartData.datasets[0].data = forecastMeas['min']
            this.chartData.datasets[1].data = forecastMeas['max']

            this.renderChart(this.chartData,this.options)
            
        },
    },    
}

