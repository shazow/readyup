<template>
  <div class="room">
    <form v-on:submit.prevent="setName">
      I am <input type="text" v-model.trim="displayname" maxlength="10" />
      <input type="submit" value="Save" />
    </form>

    Welcome to {{ $store.state.room }}.

    <ul>
      <li v-for="(peer, id) in $store.state.peers" :key="id" :title="id">
        {{peer.name}}
      </li>
    </ul>

    <wall :room="room"></wall>

    <Video></Video>
  </div>
</template>

<script>
import Wall from '@/components/Wall.vue'
import Video from '@/components/Video.vue'

export default {
  name: 'Room',
  data() {
    return {
      room: this.$route.params.id,
      displayname: this.$store.state.me.name,
    }
  },
  methods: {
    setName() {
      this.$store.commit('setMe', {name: this.displayname})
    },
  },
  components: {
    Wall,
    Video,
  },
  created() {
    this.$store.dispatch('setRoom', this.room)
  },
}
</script>
