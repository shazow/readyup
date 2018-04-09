<template>
  <div class="wall">
    <h2>Wall</h2>
    <ul class="posts">
      <li v-for="(post, idx) in $store.state.posts" :key='idx'>
        <span class="displayname">{{post.displayname}}</span> {{post.text}}
      </li>
      <li>
        <form v-on:submit.prevent="post">
          <span class="displayname">{{displayname}}</span>
          <input type="text" v-model.trim="text" placeholder="..." />
          <input type="submit" value="Post" />
        </form>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Wall',
  props: ['room', 'displayname'],
  data: () => {
    return {
      text: '',
    };
  },
  methods: {
    post() {
      this.$store.commit('addPost', {
        displayname: this.displayname,
        text: this.text,
      })
      this.text = '';
    }
  },
}
</script>

<style lang="scss">
.wall {
    li {
        margin-bottom: 0.5em;
        line-height: 1.5em;
    }
    .displayname {
        display: inline-block;
        vertical-align: bottom;
        width: 7em;
        overflow: hidden;
        font-weight: bold;
        text-align: right;
        &:after {
            content: ": ";
        }
    }
}
</style>
