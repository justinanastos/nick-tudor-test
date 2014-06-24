base-marionette
===============
[![Build Status](https://magnum.travis-ci.com/UseAllFive/base-marionette.svg?token=dfaxEQcQwzEeozJHADsN&branch=master)](https://magnum.travis-ci.com/UseAllFive/base-marionette)

## Getting started
```BASH
npm install
bower install
grunt python
grunt
```

### Annotated Source
We use [groc](http://nevir.github.io/groc) to generate annotated source code for
all our files. It is generated automatically when `grunt` is running and can be found at
`<webroot>/docs/app.html`.

# Deploy Process for Production

## Setup
### Setup Google App Engine Authentication file for deploy
```
#-- NOTE: the -n here is very important, a new line at the end of
#   this file will prevent the grunt task from being able to parse
#   this file
echo -n 'username@useallfive.com p455w0rd' > .gae.auth
```

### Setup to push to Google Code repo on production deploy

Add a .netrc to your home directory with the following contents:
```
machine code.google.com
login USERNAME@gmail.com.com
password [generated googlecode.com password]
```

To find out what your [generated googlecode.com password] should be, go to: https://code.google.com/a/google.com/hosting/settings

Prior to running the deploy command the person running the deploy will need to run:

`git remote add code.google.com https://code.google.com/a/google.com/p/gweb-artcopycode/`

## Push process
### Get latest development into master
1. Checkout development and pull latest changes `git checkout development; git pull -r`
2. Checkout master and pull latest changes `git checkout master; git pull -r`
3. Merge development into master `git merge --no-ff development`
  * Note the `--no-ff`. This forces a merge commit, which is useful when inspecting the git log.
4. Push to master `git push origin master`

### Deploy
1. Install dependencies `npm install;bower install`
2. Deploy to production `grunt deploy:prod`
  * This will ask you to select a version number. Use [semver](http://semver.org/) spec to make your decision.

### Get development up to date with master
Master will now be ahead of development because of the merge commit. Development should **always** be based off the latest verison of master.

1. Checkout development and rebase off of master `git checkout development; git rebase master`
2. Push development `git push origin development`

## Code Standards
### Sublime Settings
The JavaScript linting for this project requires [Sublime Text 3](http://www.sublimetext.com/3).

In Sublime Text 3 (ST3) install the following packages `CMD + Shift + P`:
- SublimeLinter
- SublimeLinter-jshint
- SublimeLinter-jscs

Next make sure you globally install the following on your command line:
- jshint `npm install -g jshint`
- jscs (JavaScript Code Style Checker) `npm -g install jscs`

### Resources
- Setup package control in ST3 - [Setup Package Control in ST3](https://sublime.wbond.net/installation)
- jscs documentation -  [jscs github repo](https://github.com/mdevils/node-jscs)
