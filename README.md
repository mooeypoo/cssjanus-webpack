# cssjanus-webpack
A webpack plugin wrapper for CSSJanus library, flipping RTL/LTR direcitonality rules in CSS assets

The plugin takes all `.css` assets, runs [CSSJanus](https://github.com/cssjanus/cssjanus) on them and produces a pair asset `rtl.[originalname].css` that is flipped directionalities to RTL.

# Install

To use this in your project, install dependency:
```
npm install mooeypoo/cssjsnus-webpack --save-dev
```
In webpack config, require the plugin module
```
const CSSJanusWebpackPlugin = require( './CSSJanusWebpackPlugin.js' );
```
Add the plugin to webpack
```
	plugins: [
		new CSSJanusWebpackPlugin()
	]
```

Or if you're using Encore:

```
Encore
	.addPlugin( new CSSJanusWebpackPlugin() );
```

# Development

Please report any bugs or improvement requests in [the github issues](https://github.com/mooeypoo/cssjanus-webpack/issues).

Report any bugs or improvement requests to CSSJanus [directly in its repo](https://github.com/cssjanus/cssjanus/issues).
