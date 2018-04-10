<template>
  <div class="video">
    <h2>Video</h2>
    <form v-on:submit.prevent="post">
      <label>Youtube Link</label>
      <input type="text" v-model.trim="url" placeholder="https://youtube.com/..." />
      <input type="submit" value="Set" />
    </form>
    <youtube :video-id="$store.state.video.id" ref="youtube" @playing="handlePlaying" @paused="handlePaused" @ready="handleReady" v-if="$store.state.video.id"></youtube>
  </div>
</template>

<script>

import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

export default {
  name: 'Video',
  data: () => {
    return {
      url: '',
      paused: true,
      player: null,
    }
  },
  methods: {
    handleReady(player) {
      this.player = player
      this.pullState()
    },
    handlePlaying() {
      this.paused = false
      this.pushState()
    },
    handlePaused() {
      this.paused = true
      this.pushState()
    },
    pushState() {
      if (this.$store.state.video.paused === this.paused) return;
      this.$store.commit('setVideo', {
        paused: this.paused,
        id: this.$store.state.video.id,
      })
    },
    pullState(state) {
      const video = state !== undefined ? state.video : this.$store.state.video
      if (video.paused === this.paused) return

      if (video.paused) {
        this.pause()
        return
      }

      if (video.timestamp) {
        const offset = ((+new Date()) - video.timestamp) / 1000
        this.seek(offset)
      }
      this.play()
    },
    seek(offset) {
      return this.player && this.player.seekTo(offset)
    },
    play() {
      return this.player && this.player.playVideo()
    },
    pause() {
      return this.player && this.player.pauseVideo()
    },
    isPlaying() {
      return this.player && this.player.getPlayerState() === 1
    },
    post() {
      this.$store.commit('setVideo', {
        paused: true,
        id: this.$youtube.getIdFromURL(this.url),
      })
      this.url = ''
    }
  },
  mounted() {
    this.$store.subscribe(function(mutation, state) {
      if (mutation.payload.key !== 'video') return
      if (mutation.payload.record.paused === this.paused) return
      this.pullState(state)
    }.bind(this))
  },
}
</script>
