<template>
  <div class="rtb-pagination-container" v-if="posts.length > 1" :class="`rtb-${postStyle}`">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <a
          :href="posts[(getCurrentPostIndex - 1)].link"
          @click.prevent="showPost(posts[(getCurrentPostIndex - 1)].link)"
          v-if="getCurrentPostIndex > 0"
          :class="buttonClass + ' pager newer'"
        >Prev</a>
        <a href="#" @click.prevent="closePost" v-if="postStyle == 'inline'">See all posts</a>
        <a
          :href="posts[(getCurrentPostIndex + 1)].link"
          @click.prevent="showPost(posts[(getCurrentPostIndex + 1)].link)"
          v-if="(posts.length -1) > getCurrentPostIndex"
          :class="buttonClass + ' pager older'"
        >Next</a>
      </div>
      <div class="source-link col-sm-3">
        <a :href="currentPost.link" target="_blank">View the original post</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
var dateFormat = require("dateformat");

export default {
  name: "appPagination",
  computed: {
    ...mapState([
      "posts",
      "maxCols",
      "layout",
      "postRows",
      "colClass",
      "currentPost",
      "postStyle",
      "offset",
      "buttonClass"
    ]),
    ...mapGetters(["getCurrentPostIndex"])
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
    showPost(link) {
      this.$store.dispatch("setCurrentPost", link);
      if (this.postStyle === "modal") {
        setTimeout(
          () =>
            this.$scrollTo("#postTop", 500, { container: "#post-container" }),
          1000
        );
      } else if (this.postStyle === "inline") {
        setTimeout(
          () => this.$scrollTo("#rtb-anchor", 500, { offset: this.offset }),
          1000
        );
      }
    },
    closePost() {
      this.$store.dispatch("closePost");
      setTimeout(
        () => this.$scrollTo("#rtb", 500, { offset: this.offset }),
        1000
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.rtb-pagination-container {
  &.rtb-modal {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
  }
  .row {
    text-align: center;
    .source-link {
      text-align: right;
      a {
        color: #000;
        padding: 5px;
        margin: 5px 10px;
        display: inline-block;
      }
    }
    a.pager {
      padding: 5px;
      margin: 5px 10px;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
      border: solid 1px #000;
      color: #000;
      border-radius: 3px;
    }
  }
}
</style>
