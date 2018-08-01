# pangea
[![Build Status](https://img.shields.io/travis/YerkoPalma/pangea/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/pangea) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> translate images of text

![demo](https://user-images.githubusercontent.com/5105812/43530343-5754d7fe-957b-11e8-9b76-5cfdb5dee198.gif)

## What is this?

A litle app that recognize some text from an image and translate it. Recognition 
is made with [tesseract.js][tesseract.js] and translation is provided by 
[yandex][yandex]. 

Yandex is a free software, but, as most free cloud apis, has some limited rate, 
so if you want to use this, it is a good idea to register and generate your own 
[key][key] and replace it in the [translate store](/stores/translate.js).

## Development

There is a lot to improve or add, so if you want to develop on top of it or 
contribute, you mus:

```bash
$ git clone https://github.com/YerkoPalma/pangea.git
$ cd pangea
$ npm install
$ npm start
```

## What does pangea means?

[Pangea][pangea] is the name of a super continent that existed before the earth 
splited into the current continents. I liked the idea of a single earth, with no 
countries nor borders.

## License
[MIT](/license)

[tesseract.js]: https://github.com/naptha/tesseract.js
[yandex]: https://tech.yandex.com/translate/
[key]: https://translate.yandex.com/developers/keys
[pangea]: https://en.wikipedia.org/wiki/Pangaea