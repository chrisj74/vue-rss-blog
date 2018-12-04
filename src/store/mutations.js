/*
export function someMutation (state) {
}
*/
export function addPosts(state, payload) {
  const posts = payload.slice();
  const arrays = [],
    size = state.maxCols;
  while (posts.length > 0) arrays.push(posts.splice(0, state.maxCols));
  const mergedPosts = [...state.posts, ...payload];
  mergedPosts.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.pubDate) - new Date(a.pubDate);
  });
  state.posts = mergedPosts;
  state.postRows = arrays;
}

export function setRss(state, payload) {
  state.rssUrl = payload;
}

export function setMaxCols(state, payload) {
  if (payload && 12 % payload === 0) {
    state.maxCols = payload;
    state.colClass = `col-sm-${12 / payload} rtb-col`;
  } else if (payload) {
    console.warn(
      "data-maxcols attribute must be an integer of either 1, 2 , 3, 4, 6 or 12"
    );
  }
}

export function setLayout(state, payload) {
  if (payload && (payload === "grid" || payload === "slider")) {
    state.layoutStyle = payload;
  } else if (payload) {
    console.warn('data-layout attribute must be either "grid" or "slider"');
  }
}

export function setPostStyle(state, payload) {
  if (
    payload &&
    (payload === "modal" || payload === "inline" || payload === "external")
  ) {
    state.postStyle = payload;
  } else if (payload) {
    console.warn(
      'data-poststyle attribute must be either "modal", "inline" or "external"'
    );
  }
}

export function setButtonClass(state, payload) {
  if (payload) {
    state.buttonClass = payload;
  }
}

export function setReadMore(state, payload) {
  if (payload) {
    state.readMore = payload;
  }
}
export function setOffset(state, payload) {
  if (payload) {
    state.offset = parseInt(payload);
  }
}

export function setCurrentPost(state, payload) {
  state.currentPost = payload;
}

export function clearCurrentPost(state) {
  state.currentPost = null;
}
