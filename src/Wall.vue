<template>
  <div class="wall">
    <h2>Wall</h2>
    <ul class="posts">
      <li v-for="post in wall">
        <span class="name">{{post.name}}</span> {{post.text}}
      </li>
      <li>
        <form v-on:submit.prevent="post">
          <span class="name">{{name}}</span>
          <input type="text" v-model.trim="text" placeholder="..." />
          <input type="submit" value="Post" />
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './db'

export default {
  data: () => {
    return {
      text: ''
    }
  },
  props: ['name'],
  firebase: {
    wall: db.ref('wall')
  },
  methods: {
    post() {
      db.ref('wall').push({
        name: this.name,
        text: this.text
      });
    }
  }
}
</script>

<style lang="scss">
.wall {
    li {
        margin-bottom: 0.5em;
        line-height: 1.5em;
    }
    .name {
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
