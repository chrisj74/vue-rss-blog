<template>
  <carousel :perPageCustom="[[480, 2], [768, 3], [1024, parseInt(maxCols)]]">
    <slide v-for="(post, index) in posts" :key="post.guid" :data-index="index">
      <div class="slider-post">
        <div class="post-date">{{ post.pubDate | formatPostDate }}</div>
        <div>
          <a
            :href="post.link"
            @click="showPost($event, post.link)"
            target="_blank"
            :style="'background-image: url(' + post.thumbnail + ');'"
            class="post-image"
          ></a>
        </div>
        <div>
          <a :href="post.link" @click="showPost($event, post.link)" target="_blank" class="post-title">
            <h2>{{ post.title }}</h2>
          </a>
        </div>
        <div class="author mt-2">Author: {{ post.author }}</div>
        <div class="read-more">
          <a
            :href="post.link"
            @click="showPost($event, post.link)"
            target="_blank"
            :class="buttonClass"
          >{{ readMore }}</a>
        </div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { mapState, mapGetters } from "vuex";
var dateFormat = require("dateformat");
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "appSlider",
  data: function() {
    return {
      view: null
    };
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapState([
      "posts",
      "maxCols",
      "layout",
      "postRows",
      "colClass",
      "currentPost",
      "postStyle",
      "readMore",
      "buttonClass"
    ]),
    ...mapGetters(["getCurrentPost"])
  },
  filters: {
    formatPostDate: function(value) {
      if (value) {
        var newDate = new Date(value.replace(' ', 'T'));
        return dateFormat(newDate, "dd mmm");
      }
    }
  },
  methods: {
    formatPostDescription: value => {
      return value.replace(/<img[^>]*>/g, "");
    },
    showPost(event, link) {
      if (this.postStyle === "external") {
        /** Pass through the link */
        return true;
      } else {
        event.preventDefault();
        this.$store.dispatch("setCurrentPost", link);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#rtb {
  .slider-post {
    padding: 10px;
    position: relative;
    .post-date {
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
        content: "";
        display: block;
        position: relative;
        margin-top: 60%;
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
    }
    .read-more {
      text-align: right;
    }
  }  
}
</style>
