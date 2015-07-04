## gulp-SemanticUIFrontEnd - Static Webpage skeleton  [![Build Status](https://travis-ci.org/blankdots/gulp-SemanticUIFrontEnd.svg?branch=master)](https://travis-ci.org/blankdots/gulp-SemanticUIFrontEnd)

Static Webpage skeleton generated with gulp and supports semantic-ui from the start (consider it as work in progress).
Makes use of following:

* gulp streaming build system http://gulpjs.com/
* jade template engine http://jade-lang.com/
* scss Sass http://sass-lang.com/
* coffee-script http://coffeescript.org/
* semantic-ui v2.0 http://www.semantic-ui.com/ - awesome User Interface development framework
* browser-sync http://www.browsersync.io/ synchronised browser testing tool

Author: www.blankdots.com

### Instructions

##### Clone the repository

```
git clone git@github.com:blankdots/gulp-SemanticUIFrontEnd.git
```

##### Install dependencies:

```
npm install
```

> this will run `bower install` automatically with all necessary dependencies

##### Develop:

```
gulp watch
```

The browser will start a server at the address `http://localhost:3000` and the bower-sync at `http://localhost:9001` - both of these can be configured in the gulpfile.js file.

The bower dependencies will be in the `.\dist\lib` folder (for each bower component the dependencies are copied in that folder)

##### Build

```
gulp build
```

The file build will be available in `.\dist` folder.

### License

The MIT License (MIT)

Copyright (c) 2013-2014 blankdots@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.