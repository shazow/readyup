webpackJsonp([1],{0:function(e,t,s){e.exports=s("NHnr")},G3BA:function(e,t){},M93x:function(e,t,s){"use strict";var a={name:"app"},o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("h1",[e._v("readyup")]),s("p",[e._v("\n    Coordinate your work or play sessions with your friends.\n  ")]),s("router-view",{staticClass:"view"})],1)},n=[],i=s("XyMi");function r(e){s("G3BA")}var u=!1,d=r,p=null,m=null,l=Object(i["a"])(a,o,n,u,d,p,m);t["a"]=l.exports},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var a=s("/5sW"),o=s("/ocq"),n=s("olkN"),i=s("M93x"),r=s("Yc3v"),u=s("mlqX");a["a"].config.productionTip=!1,a["a"].use(o["a"]);var d=new o["a"]({mode:"hash",base:e,routes:[{path:"/",name:"index",component:u["a"]},{path:"/room/:id",name:"room",component:r["a"]}]}),p=new a["a"]({router:d,store:n["a"],render:function(e){return e(i["a"])}}).$mount("#app");t["default"]={app:p}}.call(t,"/")},Yc3v:function(e,t,s){"use strict";s("EuXz");var a={name:"Wall",props:["room"],data:function(){return{text:""}},methods:{post:function(){this.$store.commit("addPost",this.text),this.text=""}}},o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wall"},[s("h2",[e._v("Wall")]),s("ul",{staticClass:"posts"},[e._l(e.$store.state.posts,function(t,a){return s("li",{key:a,class:{announce:!t.from}},[t.from?s("span",{staticClass:"displayname"},[e._v(e._s(e.$store.getters.name(t.from)))]):e._e(),e._v(" "+e._s(t.text)+"\n    ")])}),s("li",[s("form",{on:{submit:function(t){return t.preventDefault(),e.post(t)}}},[s("span",{staticClass:"displayname"},[e._v(e._s(e.$store.getters.name(e.$store.state.me.id)))]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.text,expression:"text",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"..."},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),s("input",{attrs:{type:"submit",value:"Post"}})])])],2)])},n=[],i=s("XyMi");function r(e){s("b4ZZ")}var u=!1,d=r,p="data-v-05b566b8",m=null,l=Object(i["a"])(a,o,n,u,d,p,m),c=l.exports,f=s("/5sW"),v=s("5/be"),h=s.n(v);f["a"].use(h.a);var y={name:"Video",data:function(){return{url:"",paused:!0,player:null,pulling:!1}},methods:{handleReady:function(e){this.player=e,this.pullState()},handlePlaying:function(){this.paused=!1;var e=this.$store.state.video;if(this.pulling){this.pulling=!1;var t=e.timestamp?(+new Date-e.timestamp)/1e3:0;this.seek(t+e.offset)}this.pushState()},handlePaused:function(){this.paused=!0,this.pushState()},pushState:function(){this.$store.state.video.paused!==this.paused&&this.$store.commit("setVideo",{paused:this.paused,offset:this.getOffset(),id:this.$store.state.video.id})},pullState:function(e){var t=void 0!==e?e.video:this.$store.state.video;if(t.paused!==this.paused)if(t.paused)this.pause();else{if(t.timestamp){var s=(+new Date-t.timestamp)/1e3;this.seek(s+t.offset)}this.pulling=!0,this.play()}},seek:function(e){return e&&this.player&&this.player.seekTo(e)},play:function(){return this.player&&this.player.playVideo()},pause:function(){return this.player&&this.player.pauseVideo()},isPlaying:function(){return this.player&&1===this.player.getPlayerState()},getOffset:function(){return this.player&&this.player.getCurrentTime()||0},post:function(){this.$store.commit("setVideo",{paused:!0,offset:0,id:this.$youtube.getIdFromURL(this.url)}),this.url=""}},mounted:function(){this.$store.subscribe(function(e,t){"handleReceive"===e.type&&void 0!==e.payload.data.video&&e.payload.data.video.paused!==this.paused&&this.pullState(t)}.bind(this))}},g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"video"},[s("h2",[e._v("Video")]),s("form",{on:{submit:function(t){return t.preventDefault(),e.post(t)}}},[s("label",[e._v("Youtube Link")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.url,expression:"url",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"https://youtube.com/..."},domProps:{value:e.url},on:{input:function(t){t.target.composing||(e.url=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),s("input",{attrs:{type:"submit",value:"Set"}})]),e.$store.state.video.id?s("youtube",{ref:"youtube",attrs:{"video-id":e.$store.state.video.id},on:{playing:e.handlePlaying,paused:e.handlePaused,ready:e.handleReady}}):e._e()],1)},b=[],_=!1,x=null,$=null,w=null,S=Object(i["a"])(y,g,b,_,x,$,w),N=S.exports,P={name:"Room",data:function(){return{room:this.$route.params.id,displayname:this.$store.state.me.name}},methods:{setName:function(){this.$store.commit("setMe",{name:this.displayname})}},components:{Wall:c,Video:N},created:function(){this.$store.dispatch("setRoom",this.room)}},O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"room"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.setName(t)}}},[e._v("\n    I am "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.displayname,expression:"displayname",modifiers:{trim:!0}}],attrs:{type:"text",maxlength:"10"},domProps:{value:e.displayname},on:{input:function(t){t.target.composing||(e.displayname=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),s("input",{attrs:{type:"submit",value:"Save"}})]),e._v("\n\n  Welcome to "+e._s(e.$store.state.room)+".\n\n  "),s("h2",[e._v("Online")]),s("ul",e._l(e.$store.state.peers,function(t,a){return s("li",{key:a,attrs:{title:a}},[e._v("\n      "+e._s(t.name||a)+"\n    ")])})),s("wall",{attrs:{room:e.room}}),s("Video")],1)},k=[],M=!1,V=null,R=null,C=null,E=Object(i["a"])(P,O,k,M,V,R,C);t["a"]=E.exports},b4ZZ:function(e,t){},mlqX:function(e,t,s){"use strict";function a(e,t){for(var s=t||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a="",o=e;o>0;o--)a+=s[~~(Math.random()*s.length)];return a}var o={name:"Index",mounted:function(){var e=a(8);this.$router.push({name:"room",params:{id:e}})}},n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e._v("Creating room...")])},i=[],r=s("XyMi"),u=!1,d=null,p=null,m=null,l=Object(r["a"])(o,n,i,u,d,p,m);t["a"]=l.exports},olkN:function(e,t,s){"use strict";var a=s("EuXz"),o=(s.n(a),s("/5sW")),n=s("NYxO"),i=s("u71l"),r=s.n(i),u=new window.Ipfs({EXPERIMENTAL:{pubsub:!0},config:{Addresses:{Swarm:["/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"]}}});o["a"].use(n["a"]);var d,p=10,m=window.localStorage;function l(e){return e}function c(){return m.getItem("name")}function f(e,t){if(!t)return"Anonymoose";var s=e.peers[t];return s&&s.name?s.name:l(t)}t["a"]=new n["a"].Store({strict:!0,state:{me:{id:"",name:c()},ready:!1,room:"",posts:[],video:{id:"",paused:!1,timestamp:0,offset:0},peers:{},started:+new Date,askedState:!1},getters:{name:function(e){return function(t){return f(e,t)}}},mutations:{handleReceive:function(e,t){var s=t.from,a=t.data;a.post&&(e.posts.push({from:s,text:a.post}),e.posts.length>p&&e.posts.shift()),a.name&&o["a"].set(e.peers,s,{name:a.name}),a.sync&&a.sync>e.started&&d.sendTo(s,JSON.stringify({state:{video:e.video,posts:e.posts,peers:e.peers}})),a.state&&e.askedState===s&&(e.me.id&&e.me.name&&(a.state.peers[e.me.id]={name:e.me.name},d.broadcast(JSON.stringify({name:e.me.name}))),e.askedState=!1,e.video=a.state.video,e.posts=a.state.posts,e.peers=a.state.peers),a.video&&(e.video.id!==a.video.id?e.posts.push({text:"Video set by "+f(e,s)}):e.video.paused&&!a.video.paused?e.posts.push({text:"Video started by "+f(e,s)+" at "+Math.round(a.video.offset,0)+"s"}):!e.video.paused&&a.video.paused?e.posts.push({text:"Video paused by "+f(e,s)}):!e.video.offset!==a.video.offset&&e.posts.push({text:"Video jumped by "+f(e,s)}),e.video=a.video)},addPost:function(e,t){e.ready?d.broadcast(JSON.stringify({post:t})):e.posts.push({from:e.me.id,text:t})},reset:function(e){e.room="",e.posts=[],e.peers={},e.video={id:"",paused:!1,timestamp:0}},setMe:function(e,t){var s=t.id,a=t.name;s&&e.me.id!==s&&(e.me.id&&o["a"].delete(e.peers,e.me.id),o["a"].set(e.me,"id",s)),a?(m.setItem("name",a),o["a"].set(e.me,"name",a),d.broadcast(JSON.stringify({name:a}))):e.me.name&&d.broadcast(JSON.stringify({name:e.me.name}))},setRoom:function(e,t){e.room=t},setVideo:function(e,t){var s=t.id,a=t.paused,o=t.offset,n=+new Date;d.broadcast(JSON.stringify({video:{id:s,paused:a,timestamp:n,offset:o}}))},addPeer:function(e,t){o["a"].set(e.peers,t,{})},removePeer:function(e,t){o["a"].delete(e.peers,t)},ready:function(e,t){e.ready=t},waitSync:function(e,t){e.askedState=t}},actions:{setRoom:function(e,t){var s=this,a=e.commit,o=e.state,n=e.dispatch;t!==o.room&&(o.ready&&a("ready",!1),d&&(d.leave(),a("reset")),a("setRoom",t),u.on("ready",function(){console.log("ready",s),d=r()(u,o.room),u.id().then(function(e){a("setMe",{id:e.id})});var e=0;d.on("peer joined",function(t){console.log("peer joined",t),e+=1,a("addPeer",t),1===e&&n("requestState",t)}),d.on("peer left",function(e){console.log("peer left",e),a("removePeer",e)}),d.on("subscribed",function(e){console.log("peer subscribed",e),e!==t&&console.error("wrong room, this should not happen"),a("ready",!0)}),d.on("message",function(e){var t=JSON.parse(e.data);console.log("message",e.from,t),a("handleReceive",{from:e.from,data:t})})}))},requestState:function(e,t){var s=e.commit,a=e.state;if(void 0===t){var o=d.getPeers();if(0===o.length)return;var n=~~(Math.random()*o.length);t=o[n]}s("waitSync",t),d.sendTo(t,JSON.stringify({sync:a.started}))}}})}},[0]);
//# sourceMappingURL=app.9baf6bd0.js.map