<template>
  <div class="room">
    Welcome to {{ $store.state.room }}.

    <wall :displayname="displayname" :room="$route.params.id"></wall>

    <Video></Video>
  </div>
</template>

<script>
import Wall from '@/components/Wall.vue'
import Video from '@/components/Video.vue'

export default {
  name: 'Room',
  props: ['displayname'],
  components: {
    Wall,
    Video,
  },
  created() {
    this.$store.dispatch('setRoom', this.$route.params.id)
  },
}
</script>
