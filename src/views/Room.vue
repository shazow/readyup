<template>
  <div class="room">
    Hello to {{ $route.params.id }}.

    <wall :name="name" :room="$route.params.id"></wall>
  </div>
</template>

<script>
import Wall from '../components/Wall.vue'

export default {
  props: ['name'],
  mounted() {
    console.log("created room", this)
  },
  components: {
    Wall,
  }
}
</script>
