## semwasp - Semantic Web App Skeleton Prospect [![Build Status](https://travis-ci.org/blankdots/semwasp.svg?branch=master)](https://travis-ci.org/blankdots/semwasp)

Skeleton generated with gulp and supports semantic-ui from the start (consider it as work in progress).
Makes use of following:

* gulp streaming build system http://gulpjs.com/
* jade template engine https://pugjs.org/
* scss Sass http://sass-lang.com/
* coffee-script http://coffeescript.org/
* semantic-ui v2.0 http://www.semantic-ui.com/ - awesome User Interface development framework
* browser-sync http://www.browsersync.io/ synchronized browser testing tool

TO DO:
* alternative ? http://webpack.github.io/
* Provide setup wizard and themes options
* Better Examples (Work in progress)
* Branch with https://facebook.github.io/react/
* Optimize delivery of images and other resources
* Localization
* Test with https://cucumber.io/

Author: www.blankdots.com

### Instructions

##### How to get started

```
git clone git@github.com:blankdots/semwasp.git
npm install
gulp build
```

> `npm install` will run `bower install` automatically with all necessary dependencies


The files build will be available in `.\dist` folder.

##### How to to develop

```
git clone git@github.com:blankdots/semwasp.git
npm install
gulp dev
```

The browser will start a server at the address `http://localhost:3000` and the bower-sync at `http://localhost:9001` - both of these can be configured in the gulpfile.js file.

In order to clean build and start fresh use `gulp clean`

###### How to to add dependencies

```
bower install d3 --save
```

In `index.jade` under the following lines the dependencies are/can be added like this:

```
	// build:js js/vendor.js
	// bower:js
	// endbower
	//endbuild
	// build:js js/plugins.js
	// endbuild
	// build:js js/main.js
	script(type='text/javascript', src='js/main.js')
	// endbuild
```

The bower dependencies are added in the `vendor.js` on the build and for additional plugins unavailable via bower the plugins and other JavaScript code can be added under:

```
	// build:js js/plugins.js
	cript(type='text/javascript', src='include/add_plugin.js')
	// endbuild
	// build:js js/main.js
	script(type='text/javascript', src='js/app.js')
	script(type='text/javascript', src='js/main.js')
	// endbuild
```

Depending where the dependencies are added these will be compiled under one file such as `plugins.js` or `main.js` .

### License

The MIT License (MIT)
