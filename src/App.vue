<template>
  <div id="app">
    <!-- <AllareaForm></AllareaForm> -->
    <UserInfoForm></UserInfoForm>
  </div>
</template>

<script>
// import AllareaForm from './components/AllareaForm.vue';
import UserInfoForm from './components/UserInfoForm.vue';

export default {
  name: 'App',
  components: {
    // AllareaForm,
    UserInfoForm
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 14px;
  /* margin-top: 60px; */
}
</style>
