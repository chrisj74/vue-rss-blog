/*
export function someAction (context) {
}
*/
import axios from "axios";
export function getPosts({ commit }, rssUrl) {
  const rssArray = rssUrl.replace(/ /g, "").split(",");
  rssArray.forEach(rss => {
    const data = {
      rss_url: rss
    };
    axios
      .get("https://api.rss2json.com/v1/api.json", { params: data })
      .then(function(response) {
        // handle success
        const posts = response.data.items;
        commit("addPosts", posts);
      })
      .catch(function(error) {
        // handle error
        console.warn(error);
      });
  });
}

export function setCurrentPost({ commit }, payload) {
  commit("setCurrentPost", payload);
}

export function closePost({ commit }) {
  commit("clearCurrentPost");
}
