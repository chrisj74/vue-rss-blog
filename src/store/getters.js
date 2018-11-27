var dateFormat = require('dateformat');
/*
export function someGetter (state) {
}
*/
export function getCurrentPost (state) {
    const post = state.posts.filter(obj => {
        return obj.link === state.currentPost;
    })
    const result = post[0];
    let html = '';
    if (result) {
        html += `<h1>${result.title}</h1>`;
        html += `<p class="post-author">${result.author} - ${dateFormat(result.pubDate, 'dd mmm')}<</p>`;
        html += `<div>${result.description}</div>`
    }
    return html;
}

export function getCurrentPostIndex (state) {
    const index = state.posts.map(function(e) { return e.link; }).indexOf(state.currentPost);
    return index;
}
