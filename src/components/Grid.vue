<template>
  <div class="row">
    <div v-for="(post) in posts" :key="post.guid" :class="colClass">
      <div class="post-date" v-if="post.pubDate">{{ post.pubDate | formatPostDate }}</div>
      <div>
        <a
          :href="post.link"
          @click="showPost($event, post.link)"
          target="_blank"
          :style="'background-image: url(' + post.thumbnail + ');'"
          :class="{'post-image' : post.thumbnail, 'no-image' : !post.thumbnail}"
        ></a>
      </div>
      <div>
        <a :href="post.link" @click="showPost($event, post.link)" target="_blank" class="post-title">
          <h2>{{ post.title }}</h2>
        </a>
      </div>
      <div class="author mt-2">Author: {{ post.author }}</div>
      <div class="excerpt" v-html="formatPostDescription(post.description)"></div>
      <div class="read-more">
        <a
          :href="post.link"
          @click="showPost($event, post.link)"
          target="_blank"
          :class="buttonClass"
        >{{readMore}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
var dateFormat = require("dateformat");

export default {
  name: "appGrid",
  data: function() {
    return {
      view: null
    };
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
      "buttonClass",
      "readMore",
      "offset"
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
        console.log('external');
        /** Pass through the link */
        return true;
      } else {
        event.preventDefault();
        this.$store.dispatch("setCurrentPost", link);
        setTimeout(
          () => this.$scrollTo("#rtb-anchor", 500, { offset: this.offset }),
          1000
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post-date {
  position: absolute;
  top: 3px;
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
.no-image {
  height: 30px;
  display: block;
}
.rtb-col {
  margin-bottom: 20px;
}
.excerpt {
  max-height: 15em;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5em;
  position: relative;
}
.read-more {
  text-align: right;
}
</style>
