# cssqueeze

> Optimize CSS files

## What is it?

A CLI tool that runs CSS files through a set of optimizations provided by [cssnano][cssnano]. It exposes a bin called `cssqueeze`.

## Installation

Install via [npm][npm] which is bundled with [node][node]:

```
npm install --global cssqueeze
```

## Example

Usage on the command line.

```
cssqueeze --source ../source.css --destination ../bundle.min.css
```

Include a `[hash]` in the destination filename to generate a unique hash code based on the source content.

```
cssqueeze --source ../source.css --destination ../bundle.[hash].min.css
```

## Custom configuration

This tool uses cssnano as the optimization module. By default it wil use all [advanced optimizations](http://cssnano.co/guides/optimisations/#what-optimisations-do-you-support) provided by cssnano.

Use the `--custom` flag to pass a custom json configuration file. This allows you to enable / disable optimizations and to pass options to the individual optimization modules.

```
cssqueeze --custom ../config.json
```

Here is an example configuration file.

```
// set browser targets for prefixing.
json config
```
