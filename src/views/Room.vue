<template>
  <div class="room">
    Hello to {{ $route.params.id }}.

    <wall :displayname="displayname" :room="$route.params.id" :wall="wall"></wall>
  </div>
</template>

<script>
import Wall from '../components/Wall.vue'

import db from '../db';

export default {
  props: ['displayname'],
  data: () => {
    const roomId = '123';
    return {
      wall: db.ref(`room/${roomId}`)
    }
  },
  mounted() {
    console.log("created room", this)
  },
  components: {
    Wall,
  }
}
</script>
