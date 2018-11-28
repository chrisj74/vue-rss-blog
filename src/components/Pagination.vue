<template>
    <div class="pagination-container" v-if="posts.length > 1" :class="`rtb-${postStyle}`">
        <div class="container">
            <div class="source-link">
                <a :href="currentPost.link" target="_blank">View the original post</a>
            </div>
            <a :href="posts[(getCurrentPostIndex - 1)].link" @click.prevent="showPost(posts[(getCurrentPostIndex - 1)].link)" v-if="getCurrentPostIndex > 0" class="pager newer">Prev</a>
            <a href="#" @click.prevent="closePost" v-if="postStyle == 'inline'">See all posts</a>
            <a :href="posts[(getCurrentPostIndex + 1)].link" @click.prevent="showPost(posts[(getCurrentPostIndex + 1)].link)" v-if="(posts.length -1) > getCurrentPostIndex" class="pager older">Next</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
var dateFormat = require('dateformat');

export default {
  name: 'appPagination',
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
        'getCurrentPostIndex'
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
    showPost(link) {
      this.$store.dispatch('setCurrentPost', link);
      this.$scrollTo('#postTop', 1000, {container: '#post-container'});

    },
    closePost() {
        this.$store.dispatch('closePost');
        this.$scrollTo('#rtb', 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pagination-container {
    &.rtb-modal {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .container {
        text-align: center;
        .source-link {
            text-align: right;
            a {
                color: #000;
            }
        }
        .pager {
            padding: 5px;
            margin: 5px 10px;
            cursor: pointer;
            display: inline-block;
            text-decoration: none;
            border: solid 1px #000;
            color: #000;
            background: #fff;
        }
    }
}
</style>
