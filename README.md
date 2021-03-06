[![Build Status](https://travis-ci.org/mrloop/race-ext.svg)](https://travis-ci.org/mrloop/race-ext)

# ⚙ race-ext

Web Extension to retrieve britishcycling.org.uk/events entrants ordered by regional and national rankings

[Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/know-the-competition/)

[Chrome addon](https://chrome.google.com/webstore/detail/know-the-competition/odlnobeiombjhcehmhonbiijfeodcoae)

![web extension screenshot](race-ext.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone git@github.com:mrloop/race-ext.git` this repository
* `cd race-ext`
* `yarn`

## Running / Development

* `yarn start:firefox`
* `yarn start:chrome`

### Building

* `yarn build`

### Testing

* `yarn test`

### Deploy

Build for firefox ext

```
yarn build-ext
```

Build for chrome ext

```
ember build -o extension-chrome/dist
web-ext build -s extension-chrome -a web-ext-artifacts-chrome

```

* [Firefox](https://addons.mozilla.org/en-GB/developers/addon/submit/upload-listed)
* [Chrome](https://chrome.google.com/webstore/developer/update?authuser=1)
* [Edge](http://docs.microsoft.com/en-us/microsoft-edge/extensions/getting-started#publishing-to-the-windows-store)


## Further Reading / Useful Links

* [MDN WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
* [Microsoft WebExtensions](https://docs.microsoft.com/en-us/microsoft-edge/extensions/getting-started)
* [British Cycling](https://www.britishcycling.org.uk/events?search_type=upcoming)
* [glimmerjs](http://github.com/tildeio/glimmer/)
* [ember-cli](https://ember-cli.com/)
