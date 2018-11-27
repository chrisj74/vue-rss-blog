<template>
  <carousel :per-page="parseInt(maxCols)" >
    <slide v-for="(post, index) in posts" :key="post.guid" :data-index="index">
      <div class="slider-post">
        <div class="post-date">{{ post.pubDate | formatPostDate }}</div>
        <div><a :href="post.link" @click.prevent="showPost($event, post.link)" target="_blank" :style="'background-image: url(' + post.thumbnail + ');'" class="post-image"></a></div>
        <div><a :href="post.link" @click.prevent="showPost($event, post.link)" target="_blank"><h2>{{ post.title }}</h2></a></div>
        <div class="author mt-2">Author: {{ post.author }}</div>
        <div class="read-more"><a :href="post.link" @click="showPost($event, post.link)" target="_blank">Read more</a></div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
var dateFormat = require('dateformat');
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'appSlider',
  data: function(){
    return {
      view: null
    }
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapState([
      'posts',
      'maxCols',
      'layout',
      'postRows',
      'colClass',
      'currentPost',
      'postStyle'
    ]),
    ...mapGetters([
      'getCurrentPost'
    ])

  },
  filters: {
    formatPostDate: function(value) {
      if (value) {
          return dateFormat(value, 'dd mmm');
      }
    },

  },
  methods: {
    formatPostDescription: (value) => {
      return value.replace(/<img[^>]*>/g,"");
    },
    showPost(event, link) {
      if (this.postStyle === 'external') {
        /** Pass through the link */
        return true;
      } else {
        event.preventDefault();
        this.$store.dispatch('setCurrentPost', link)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slider-post {
  padding: 10px;
  position: relative;
}
.post-date{
  position: absolute;
  top: 18px;
  left: 18px;
  background-color: #fff;
  padding: 5px;
  color: #000;
}
.post-image {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: auto;
  display: block;
  &:after {
    content: '';
    display: block;
    position: relative;
    margin-top: 66%;
    width: 100%;
    z-index: 1;
  }
}
.excerpt {
  max-height: 4.5em;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5em;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 1.5em;
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 1%, rgba(255,255,255,0.85) 48%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,0.02) 1%,rgba(255,255,255,0.85) 48%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.02) 1%,rgba(255,255,255,0.85) 48%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  }
}
.read-more {
  text-align: right;
}
</style>
