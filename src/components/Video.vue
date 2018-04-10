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
      pulling: false,
    }
  },
  methods: {
    handleReady(player) {
      this.player = player
      this.pullState()
    },
    handlePlaying() {
      this.paused = false
      const video = this.$store.state.video
      if (this.pulling) {
        // Seek again just in case buffering took a while
        this.pulling = false
        const offset = video.timestamp ? ((+new Date()) - video.timestamp) / 1000 : 0
        this.seek(offset + video.offset)
      }
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
        offset: this.getOffset(),
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
        this.seek(offset + video.offset)
      }
      this.pulling = true
      this.play()
    },
    seek(offset) {
      return offset && this.player && this.player.seekTo(offset)
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
    getOffset() {
      return this.player && this.player.getCurrentTime() || 0
    },
    post() {
      this.$store.commit('setVideo', {
        paused: true,
        offset: 0,
        id: this.$youtube.getIdFromURL(this.url),
      })
      this.url = ''
    }
  },
  mounted() {
    this.$store.subscribe(function(mutation, state) {
      if (mutation.type !== 'handleReceive') return
      if (mutation.payload.data.video === undefined) return
      if (mutation.payload.data.video.paused === this.paused) return
      this.pullState(state)
    }.bind(this))
  },
}
</script>
