import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import InputForecasts from '../components/InputForecasts';

import ResultForecasts from '../components/ResultForecasts';

import LegalMentions from '../components/LegalMentions.vue';

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path: '/InputForecasts',
      name: 'InputForecasts',
      component: InputForecasts
    },

    {
      path: '/ResultForecasts',
      name: 'ResultForecasts',
      component: ResultForecasts
    },

    {
      path: '/LegalMentions',
      name: 'LegalMentions',
      component: LegalMentions
    },


  ]
})
