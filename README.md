# vue-rss-blog
An embeddable to pull an RSS feed into your website. I built this to embed a Medium blog on a separate website. Testing has only been done on the medium RSS Feed.

It uses the https://api.rss2json.com/v1/api.json service to retrieve and convert the RSS to JSON.

THIS PROJECT IS IN ALPHA - USE AT YOUR PERIL

Installation
Clone repo
run $ npm install

To run locally $ npm run serve

Build using $ npm run build
Host the retainable.js and retainable.css files on your webserver.

Place the entry point into your page and include the JS and CSS files on the same.

Options are passed in as data attributes on the entry point div

Example:
<link href="/retainable.js" rel="preload" as="script">
...
<div id="retainable"
         data-rss="https://medium.com/feed/the-antidote"
         data-maxcols="3"
         data-layout="slider"
         data-poststyle="inline"></div>
...
<script src="/retainable.js"></script>

Alternatively there is an example of a widget style script in the demo folder, that injects the CSS & Script tags into the page (you still need to add the entry point div.
         
attribute = id
required = true
value = must be "retainable"

attribute = data-rss
required = true
value = must be a valid URL

attribute = data-maxcols
description = the maximum columns to show in the index mode
required = false
default = 2
value = this uses a scoped version of bootstrap, so the max cols must be 1, 2, 3, 4, 6 or 12

attribute = data-layout
description = styles the index of available posts
required = false
default = grid
values = grid or slider

attribute = data-poststyle
description = The style of posts when you click on an excerpt in the index
required = false
default = modal
values = modal, inline, external
