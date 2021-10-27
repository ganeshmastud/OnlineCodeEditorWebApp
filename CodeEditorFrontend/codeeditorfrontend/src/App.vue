<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar></Navbar>
    <CodeEditor></CodeEditor>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CodeEditor from './components/code_editor.vue'
import Navbar from './components/NavBar'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    Navbar,
    CodeEditor
  }
}
</script>

<style>

</style>
