/*
export function someMutation (state) {
}
*/
export function addPosts (state, payload) {
    const posts = payload.slice()
    const arrays = [], size = state.maxCols;
    while (posts.length > 0)
        arrays.push(posts.splice(0, state.maxCols));
    state.posts = payload;
    state.postRows = arrays
}

export function setRss (state, payload) {
    var re = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    if (payload && re.test(payload)) {
       state.rssUrl = payload;
    } else {
        console.warn('data-rss attribute is required and must be a valid url.')
    }
}

export function setMaxCols (state, payload) {
    if (payload && (12 % payload === 0)) {
        state.maxCols = payload;
        state.colClass = `col-sm-${12 / payload}`;
    } else if (payload) {
        console.warn('data-maxcols attribute must be an integer of either 1, 2 , 3, 4, 6 or 12')
    }
}

export function setLayout (state, payload) {
    if (payload && (payload === 'grid' || payload === 'slider')) {
        state.layoutStyle = payload;
    } else if (payload) {
        console.warn('data-layout attribute must be either "grid" or "slider"');
    }
}

export function setPostStyle (state, payload) {
    if (payload && (payload === 'modal' || payload === 'inline' || payload === 'external')) {
        state.postStyle = payload;
    } else if (payload) {
        console.warn('data-poststyle attribute must be either "modal", "inline" or "external"');
    }
}

export function setCurrentPost (state, payload) {
    state.currentPost = payload;
}

export function clearCurrentPost(state) {
    state.currentPost = null;
}
