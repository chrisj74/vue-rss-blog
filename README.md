# vue-rss-blog
An embeddable to pull an RSS feed into your website. I built this to embed a Medium blog on a separate website. Testing has only been done on the medium RSS Feed.

It uses the https://api.rss2json.com/v1/api.json service to retrieve and convert the RSS to JSON.

## THIS PROJECT IS IN ALPHA - USE AT YOUR PERIL

## Installation
Clone repo

    $ npm install

To run locally

    $ npm run serve

Build using

    $ npm run build

Host the retainable.js and retainable.css files on your webserver.

Place the entry point into your page and include the JS and CSS files on the same.

Options are passed in as data attributes on the entry point div

## Example:

    <link href="/retainable.css">

...

    <div id="retainable"
             data-rss="https://medium.com/feed/the-antidote"
             data-maxcols="3"
             data-layout="slider"
             data-poststyle="inline"
             data-readmore="Read the rest"
             data-buttonclass="btn btn-primary"
             data-offset="-100"></div>

...

    <script src="/retainable.js"></script>

Alternatively there is an example of a widget style script in the demo folder, that injects the CSS & Script tags into the page (you still need to add the entry point div.
## Views
The widget has two distinct views
### Index view
This is the way your posts are shown in summary.

**Grid view** will display the thumbnail, the title and the author with a "read more" link. It uses maxcols to define the number of columns.

**Slider view** will display a carousel of posts with the same details as grid. It uses maxcols to define how many posts to show at one time.
### Post view


##  Options
| Option | Default | Reqiuired | Details
|---|--|--|------|
|id|n/a|Yes|You must set the value of your entry point's id to "retainable".|
|data-rss|n/a|Yes|You must provide at least one valid url to the RSS endpoint, multiple rss feeds can be combined with a comma separated list|
|data-maxcols|2|Optional|must be an interger of 1, 2, 3, 4, 6 or 12 and controls the number of cols display in the index view|
|data-layout|grid|Optional|Styles the index of available posts, can be set to "grid" or "slider"|
|data-poststyle|modal|Optional|The style of posts when you click on an excerpt in the index can be set to one of: "modal", "inline" or "external", external opens the post's source with a target of _blank|
|data-buttonclass|  |Optional|Space separated list of classes to apply to the read more button|
|data-readmore|Read more|Optional|Text to show on the read more button|
|data-offset|0|Optional|If you have a fixed header then you can set a negative offset integer for scrolling when the posts are shown inline e.g. -100 (converts to pixels)|

