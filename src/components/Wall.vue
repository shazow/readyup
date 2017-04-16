<template>
  <div class="wall">
    <h2>Wall</h2>
    <ul class="posts">
      <li v-for="post in wall">
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

import db from '../db'

const maxLength = 10;

export default {
  data: () => {
    return {
      text: ''
    }
  },
  props: ['displayname', 'room'],
  firebase: {
    wall: db.wallRef,
  },
  methods: {
    post() {
      db.wallRef.push({
        displayname: this.displayname,
        text: this.text
      });
      this.text = "";
      if (this.wall.length > maxLength) {
        // Remove the first child
        db.wallRef.child(this.wall[0][".key"]).remove()
      }
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
