<template>
  <div class="room">
    Welcome to {{ $store.state.room }}.

    <wall :displayname="displayname" :room="$route.params.id"></wall>
  </div>
</template>

<script>
import Wall from '@/components/Wall.vue'

export default {
  name: 'Room',
  props: ['displayname'],
  components: {
    Wall,
  },
  created() {
    this.$store.dispatch('setRoom', this.$route.params.id)
  },
}
</script>
