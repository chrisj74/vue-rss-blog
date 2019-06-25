<template>
  <portal name="blog" to="destination" target-el="#rtb-modal" :disabled="postStyle === 'inline'">
    <transition name="fade">
      <div id="post-container" v-if="getCurrentPost" :class="`rtb-${postStyle}`">
        <div id="postTop"></div>
        <div class="rtb-close" @click="closePost">
          <span>X</span>
        </div>
        <div class="container">
          <div class="mb-3">
            <div class="col-sm-12" v-for="(post, index) in posts" :key="`post-${index}`">
              <transition name="fade">
                <div v-if="index == getCurrentPostIndex" v-html="getCurrentPost"></div>
              </transition>
            </div>
          </div>
        </div>
        <app-pagination></app-pagination>
      </div>
    </transition>
  </portal>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import appPagination from "./Pagination";
var dateFormat = require("dateformat");
import { Portal, PortalTarget } from "portal-vue";

export default {
  name: "appPost",
  components: {
    appPagination,
    Portal
  },
  computed: {
    ...mapState([
      "posts",
      "maxCols",
      "layout",
      "postRows",
      "colClass",
      "postStyle",
      "offset"
    ]),
    ...mapGetters(["getCurrentPost", "getCurrentPostIndex"])
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
    closePost() {
      this.$store.dispatch("closePost");
      setTimeout(
        () => this.$scrollTo("#rtb-anchor", 500, { offset: this.offset }),
        1000
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#post-container {
  &.rtb-modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 999;
    background: rgba(255, 255, 255, 0.9);
    overflow: auto;
    padding-bottom: 50px;
    .rtb-close {
      background: #000;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      line-height: 50px;
      position: fixed;
      top: 10px;
      right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        color: #fff;
        font-size: 30px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
    .container {
      background: #fff;
      color: #000;
      h1,
      p,
      em,
      i,
      div,
      h2,
      h3 {
        color: #000 !important;
      }
      h1 {
        font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
          Geneva, Arial, sans-serif !important;
        font-size: 42px;
        line-height: 43px;
      }
      h2 {
        font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
          Geneva, Arial, sans-serif !important;
        font-size: 28px;
        line-height: 34px;
      }
      p,
      em,
      i,
      strong,
      div,
      a,
      blockquote {
        font-family: Georgia, Cambria, "Times New Roman", Times, serif !important;
        font-size: 21px;
        line-height: 33px;
      }
    }
  }
  &.rtb-inline {
    position: relative;
    .rtb-close {
      display: none;
    }
  }
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
