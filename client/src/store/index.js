import Vue from "vue";
import Vuex from "vuex";

import ServerServices from '../services/ServerServices.js'

Vue.use(Vuex);


export default new Vuex.Store({

   state: {

     allForecasts: {},

     dataAreloaded:false,
     currentNavPath: null,

     selectedLocName: 'Bordeaux',
     
     selectedStartingDate: '2019-03-29',
     selectedEndingDate: '2019-07-15',

     selectedDate: '2019-07-15',

     forceComponentUpdateCounter:0
   },


   getters: { // computed methods

      getAllForecasts: (state) => {
         return state.allForecasts;
      },

      getLocNames: (state) => {
         return Object.keys(state.allForecasts);
      },

      getDataAreLoaded: (state) =>{
         return state.dataAreloaded
      },

      getSelectedLocName: (state) =>{
         return state.selectedLocName
      },

      getDates: (state) => {
         return state.allForecasts['Bordeaux']['input']['0'].Dates;
      },

      getMembers: (state) => {
         return Object.keys(state.allForecasts['Bordeaux']['input']);
      },

      getSelectedStartingDate: (state) =>{
         return state.selectedStartingDate
      },

      getSelectedEndingDate: (state) =>{
         return state.selectedEndingDate
      },

      getSelectedDate: (state) =>{
         return state.selectedDate
      }


   },

   mutations: { // synchronous  commit of changes of state

      initAllForecasts: (state, allForecasts) =>{
         state.allForecasts = allForecasts;
      },

      setDataAreLoaded: (state, bool) =>{
         state.dataAreloaded =bool
      },
      
      setCurrentNavPath: (state,val) =>{
         state.currentNavPath=val;
      },

      setSelectedLocName: (state,val) =>{
         state.selectedLocName = val
      },

      setSelectedStartingDate: (state,val) =>{
         state.selectedStartingDate = val
      },

      setSelectedEndingDate: (state,val) =>{
         state.selectedEndingDate = val
      },

      setSelectedDate: (state,val) =>{
         state.selectedDate = val
      },

      incrementForceComponentUpdateCounter(state){
         state.forceComponentUpdateCounter=  state.forceComponentUpdateCounter +1;
      }
   },

   actions: { // assynchronous commit of changes
      async initAllForecasts({ state, commit }) {

         const allForecasts = await ServerServices.getAllForecasts()

         commit('initAllForecasts', allForecasts)
         commit ('setDataAreLoaded',true)

         console.log('state.allForecasts')
         console.log(state.allForecasts)

         console.log('getters.getMembers')
         console.log(this.getters.getMembers)
         
      },


   
      
   }
});

