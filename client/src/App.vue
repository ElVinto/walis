<template>
  <div id="app">
    <div id="header" v-if="$router.currentRoute.path !== '/'" >
      <Header /> 
    </div>

    <div id="navbar">
      <Navbar />
    </div>

    <router-view />

    <div id="footer">
      <Footer />
    </div>
  </div>
</template>

<script>


import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {    
    Footer,
    Header,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  padding:2px
}
</style>
