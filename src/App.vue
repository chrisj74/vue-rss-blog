<template>
  <div id="rtb">
    <transition-group name="fade">
      <app-grid v-if="layoutStyle == 'grid' && !currentPost" key="grid"></app-grid>
      <app-slider v-if="layoutStyle == 'slider' && !currentPost" key="slider"></app-slider>
      <app-post v-if="postStyle === 'inline' && currentPost" key="post"></app-post>
    </transition-group>
    <app-post v-if="postStyle === 'modal'"></app-post>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import appGrid from './components/Grid'
import appPost from './components/Post'
import appSlider from './components/Slider'
export default {
  props: [
    'rss',
    'maxcols',
    'layout',
    'poststyle'
  ],
  components: {
    appGrid,
    appPost,
    appSlider
  },
  created () {
    /**
     * kick off the store
     */
    this.$store.commit('setRss', this.rss)
    this.$store.commit('setMaxCols', this.maxcols)
    this.$store.commit('setLayout', this.layout)
    this.$store.commit('setPostStyle', this.poststyle)
    this.$store.dispatch('getPosts', this.rss)
  },
  computed: {
    ...mapState([
      'posts',
      'maxCols',
      'layoutStyle',
      'postRows',
      'colClass',
      'currentPost',
      'postStyle'
    ]),
    ...mapGetters([
      'getCurrentPost'
    ])
  },
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@-ms-viewport {
    width: device-width
}

html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar
}

*,
:after,
:before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit
}
$container-max-widths: (
  sm: 540px,
  md: 699px,
  lg: 700px,
  xl: 800px
);
#rtb, #rtb-modal {
  @import '../node_modules/bootstrap/scss/bootstrap-grid.scss';
  @import '../node_modules/bootstrap/scss/utilities/_spacing.scss';
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
}
#rtb {
  position: relative;
}


</style>
