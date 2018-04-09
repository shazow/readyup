import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseMutations, firebaseAction} from 'vuexfire'

import db from '@/db'

Vue.use(Vuex);


const maxLength = 10;

export default new Vuex.Store({
  strict: true,
  state: {
    room: '',
    posts: [],
    video: {
      id: '',
      paused: false,
    },
  },
  getters: {
  },
  mutations: {
    addPost(state, {displayname, text}) {
      const ref = db.ref('room').child(state.room).child('posts')
      ref.push({displayname, text})
      if (state.posts.length > maxLength) {
        // Remove the first child
        ref.child(state.posts[0][".key"]).remove()
      }
    },
    setRoom(state, room) {
      state.room = room;
    },
    setVideo(state, {id, paused}) {
      db.ref('room').child(state.room).child('video').set({id, paused})
    },
    ...firebaseMutations,
  },
  actions: {
    setRoom: firebaseAction(({ commit, bindFirebaseRef }, roomId) => {
      const ref = db.ref('room').child(roomId)
      bindFirebaseRef('posts', ref.child('posts'))
      bindFirebaseRef('video', ref.child('video'))
      commit('setRoom', roomId)
    }),
  },
})
