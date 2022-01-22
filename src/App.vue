<template>
  <div id="app">
    <router-view/>
    <footer>
      <router-link to="/">Go to home</router-link>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
footer {
  margin-top: 10vh;
}
</style>
