<template>
  <div class="room">
    Hello to {{ $route.params.id }}.

    <wall :displayname="displayname" :room="$route.params.id"></wall>
  </div>
</template>

<script>
import Wall from '../components/Wall.vue'

export default {
  props: ['displayname'],
  mounted() {
    console.log("created room", this)
  },
  components: {
    Wall,
  }
}
</script>
