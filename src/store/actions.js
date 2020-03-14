/*
export function someAction (context) {
}
*/
import axios from "axios";
export function getPosts({ commit }, rss) {

  const rssArray = rss.split(",");
  const rssUrlsWithOptionsArray = rssArray.map(rss => {
    const rssUrlWithOptions = rss.split("|");
    return {
      rssUrl: rssUrlWithOptions[0],
      rssItemsCount: rssUrlWithOptions[1]
    }
  });

  rssUrlsWithOptionsArray.forEach(rssUrlWithOptions => {
    const data = {
      rss_url: rssUrlWithOptions.rssUrl
    };
    axios
      .get("https://api.rss2json.com/v1/api.json", { params: data })
      .then(function(response) {
        // handle success
        const posts = response.data.items.slice(0,rssUrlWithOptions.rssItemsCount);
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
