<template>
  <div id="app">
    <h1>readyup</h1>
    <p>
      Coordinate your work or play sessions with your friends.
    </p>
    <p>
      I am <input type="text" v-model.trim="displayname" maxlength="10" />
    </p>

    <router-view :displayname="displayname" class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      displayname: 'Anonymoose',
      room: '',
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2em;
}

h1, h2 {
  font-weight: normal;
  margin: 1.5em 0 0.5em 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
