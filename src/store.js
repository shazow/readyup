import Vue from 'vue'
import Vuex from 'vuex'

import Room from 'ipfs-pubsub-room'
const ipfs = new window.Ipfs({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        // TODO: Try webrtc? https://github.com/ipfs/js-ipfs/issues/1088
        //'/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})


Vue.use(Vuex)

const maxLength = 10
const browserStore = window.localStorage

function anonName(peer) {
  return peer
}

function defaultName() {
  return browserStore.getItem('name')
}

let ipfsRoom;

export default new Vuex.Store({
  strict: true,
  state: {
    me: {
      id: '',
      name: defaultName(),
    },
    ready: false,
    room: '',
    posts: [],
    video: {
      id: '',
      paused: false,
      timestamp: 0,
      offset: 0,
    },
    peers: {},
    started: +new Date(),
    askedState: false,
  },
  getters: {
    name: (state) => (peer) => {
      const p = state.peers[peer]
      if (!p || !p.name) return anonName(peer)
      return p.name
    }
  },
  mutations: {
    handleReceive(state, {from, data}) {
      if (data.post) {
        state.posts.push({
          from: from,
          text: data.post
        })
        if (state.posts.length > maxLength) {
          state.posts.shift();
        }
      }
      if (data.name) {
        Vue.set(state.peers, from, {name: data.name})
      }
      if (data.sync && data.sync > state.started) {
        ipfsRoom.sendTo(from, JSON.stringify({
          state: {
            video: state.video,
            posts: state.posts,
            peers: state.peers,
          },
        }))
      }
      if (data.state && state.askedState===from) {
        if (state.me.id && state.me.name) {
          // Override me
          data.state.peers[state.me.id] = { name: state.me.name }
          ipfsRoom.broadcast(JSON.stringify({name: state.me.name}))
        }
        state.askedState = false
        state.video = data.state.video
        state.posts = data.state.posts
        state.peers = data.state.peers
      }
      if (data.video) {
        state.video = data.video
      }
    },
    addPost(state, post) {
      if (state.ready) {
        ipfsRoom.broadcast(JSON.stringify({post}))
      } else {
        state.posts.push({
          from: state.me.id,
          text: post,
        })
      }
    },
    reset(state) {
      state.room = ''
      state.posts = []
      state.peers = {}
      state.video = {
        id: '',
        paused: false,
        timestamp: 0,
      }
    },
    setMe(state, {id, name}) {
      if (id && state.me.id !== id) {
        if (state.me.id) delete state.peers[state.me.id]
        Vue.set(state.me, 'id', id)
      }
      if (name) {
        browserStore.setItem('name', name)
        Vue.set(state.me, 'name', name)
        ipfsRoom.broadcast(JSON.stringify({name}))
      } else if (state.me.name) {
        ipfsRoom.broadcast(JSON.stringify({name: state.me.name}))
      }
    },
    setRoom(state, room) {
      state.room = room;
    },
    setVideo(state, {id, paused, offset }) {
      const timestamp = +new Date()
      state.video = { id, paused, timestamp, offset }
      ipfsRoom.broadcast(JSON.stringify({video: state.video}))
    },
    addPeer(state, peer) {
      Vue.set(state.peers, peer, {
      })
    },
    removePeer(state, peer) {
      delete state.peers[peer]
    },
    ready(state, value) {
      state.ready = value
    },
    waitSync(state, peer) {
      state.askedState = peer
    }
  },
  actions: {
    setRoom({commit, state, dispatch}, room) {
      if (room === state.room) return
      if (state.ready) commit('ready', false)
      if (ipfsRoom) {
        ipfsRoom.leave()
        commit('reset')
      }

      commit('setRoom', room)

      ipfs.on('ready', () => {
        console.log('ready', this)
        ipfsRoom = Room(ipfs, state.room)

        ipfs.id().then((peerInfo) => {
          commit('setMe', {id: peerInfo.id})
        })

        let numPeers = 0
        ipfsRoom.on('peer joined', (peer) => {
          console.log('peer joined', peer)
          numPeers += 1
          commit('addPeer', peer)

          if (numPeers === 1) {
            dispatch('requestState', peer)
          }
        })

        ipfsRoom.on('peer left', (peer) => {
          console.log('peer left', peer)
          commit('removePeer', peer)
        })

        ipfsRoom.on('subscribed', (id) => {
          console.log('peer subscribed', id)
          if (id !== room) {
            console.error('wrong room, this should not happen')
          }
          commit('ready', true)
        })

        ipfsRoom.on('message', (message) => {
          const data = JSON.parse(message.data)
          console.log('message', message.from, data)
          commit('handleReceive', {from: message.from, data: data})
        })
      })
    },
    requestState({commit, state}, peer) {
      if (peer === undefined) {
        // We choose a random peer to get state from
        const peers = ipfsRoom.getPeers()
        if (peers.length === 0) return // We're the host?

        const idx = ~~(Math.random() * peers.length)
        peer = peers[idx]
      }
      commit('waitSync', peer)
      ipfsRoom.sendTo(peer, JSON.stringify({sync: state.started}))
    },
  }
})
