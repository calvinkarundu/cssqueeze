# cssqueeze

> A CLI wrapper for cssnano

## What is it?

A CLI tool that runs CSS files through a set of optimizations provided by [cssnano](https://github.com/ben-eb/cssnano). It exposes a bin called `cssqueeze`.

## Installation

Install via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/en/):

```sh
$ npm install -g cssqueeze
```

## CLI Usage

```sh
$ cssqueeze --source source.css --destination bundle.min.css
# squeezed into -> ./bundle.min.css
```

Include a `[hash]` in the destination filename to generate a unique hash code based on the source content:

```sh
$ cssqueeze --source source.css --destination bundle.[hash].min.css
# squeezed into -> ./bundle.0d422da9649ff811b3c90224cca0680c.min.css
```

See `cssqueeze --help` for more info.

## Custom Configuration

This tool uses [cssnano](https://github.com/ben-eb/cssnano) as the optimization module. By default it wil use all [advanced optimizations](http://cssnano.co/guides/optimisations/#what-optimisations-do-you-support) provided by cssnano.

Use the `--config` flag to pass a custom json configuration file. This allows you to enable / disable optimizations and to pass options to the individual optimization modules.

```sh
$ cssqueeze --config config.json
```

The following configuration file disables the [postcss-discard-comments](https://github.com/ben-eb/cssnano/tree/master/packages/postcss-discard-comments) plugin and sets [autoprefixer](https://github.com/postcss/autoprefixer) browser targets to those that have more than 5% global usage statistics.

```json
{
  "source": "./source.config.css",
  "destination": "./bundle.[hash].min.css",
  "plugins": {
    "postcss-discard-comments": false,
    "autoprefixer": {
      "browsers": ["> 5%"],
      "add": true
    }
  }
}
```
