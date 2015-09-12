## semwasp - Semantic Web App Skeleton Prospect [![Build Status](https://travis-ci.org/blankdots/semwasp.svg?branch=master)](https://travis-ci.org/blankdots/semwasp)

Skeleton generated with gulp and supports semantic-ui from the start (consider it as work in progress).
Makes use of following:

* gulp streaming build system http://gulpjs.com/
* jade template engine http://jade-lang.com/
* scss Sass http://sass-lang.com/
* coffee-script http://coffeescript.org/
* semantic-ui v2.0 http://www.semantic-ui.com/ - awesome User Interface development framework
* browser-sync http://www.browsersync.io/ synchronized browser testing tool

TO DO:

* Choose one: react JS, knockout JS, Ember JS, Angular JS or other (Work in progress)
* cucumber https://cucumber.io/ (Work in progress)
* Optimize delivery of images and 
* Localization
* Test runner for TDD karma JS 
* Better Examples (Work in progress)

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



### License

The MIT License (MIT)
