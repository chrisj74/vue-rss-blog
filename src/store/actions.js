/*
export function someAction (context) {
}
*/
import axios from "axios";
export function getPosts({ commit }, rss) {

  const rssArray = rss.split(",");
  const rssUrlsWithOptionsArray = rssArray.map(rss => {
    const rssUrlWithOptions = rss.split("|");
    const rssItemsCountParam = parseInt(rssUrlWithOptions[1]);
    //check if rssItemsCountParam is a valid number
    let rssItemsCount;
    if(Number.isInteger(rssItemsCountParam)) {
      rssItemsCount = rssItemsCountParam
    } else {
      rssItemsCount = null;
    }
    return {
      rssUrl: rssUrlWithOptions[0] ? rssUrlWithOptions[0].trim() : rssUrlWithOptions[0],
      rssItemsCount: rssItemsCount
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
        let posts;
        //take only needed items if rssItemsCount is valid
        if(rssUrlWithOptions.rssItemsCount) {
          posts = response.data.items.slice(0,rssUrlWithOptions.rssItemsCount);
        } else {
          posts = response.data.items;
        }
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
