/*
export function someAction (context) {
}
*/
import axios from 'axios'
export function getPosts ({ commit }, rssUrl) {
    const data = {
        rss_url: rssUrl
    };
    axios.get('https://api.rss2json.com/v1/api.json', {params:data})
        .then(function (response) {
            // handle success
            console.log(response);
            const posts = response.data.items;
            commit('addPosts', posts);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export function setCurrentPost ({ commit }, payload) {
    commit('setCurrentPost', payload);
}

export function closePost ({ commit }) {
    commit('clearCurrentPost');
}
