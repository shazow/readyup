<template>
  <div class="video">
    <h2>Video</h2>
    <form v-on:submit.prevent="post">
      <label>Youtube Link</label>
      <input type="text" v-model.trim="url" placeholder="https://youtube.com/..." />
      <input type="submit" value="Set" />
    </form>
    <youtube :video-id="$store.state.video.id" ref="youtube" @playing="handlePlaying" @paused="handlePaused" v-if="$store.state.video.id"></youtube>
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
    };
  },
  methods: {
    handlePlaying() {
      this.paused = false
      this.syncPause()
    },
    handlePaused() {
      this.paused = true
      this.syncPause()
    },
    syncPause() {
      if (this.$store.state.video.paused === this.paused) return;
      this.$store.commit('setVideo', {
        paused: this.paused,
        id: this.$store.state.video.id,
      });
    },
    isPlaying() {
      return this.$refs.youtube.player.getPlayerState() === 1;
    },
    post() {
      this.$store.commit('setVideo', {
        paused: true,
        id: this.$youtube.getIdFromURL(this.url),
      })
      this.url = ''
    }
  },
  created() {
    const app = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type !== 'vuexfire/OBJECT_VALUE') return;
      if (mutation.payload.key !== 'video') return;
      if (mutation.payload.record.paused === app.paused) return;
      console.log('Changing state', mutation);
      if (mutation.payload.record.paused) {
        app.$refs.youtube.player.pauseVideo();
      } else {
        app.$refs.youtube.player.playVideo();
      }
    });
  },
}
</script>
