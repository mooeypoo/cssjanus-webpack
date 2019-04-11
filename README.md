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
const CSSJanusWebpackPlugin = require( 'mooeypoo/cssjsnus-webpack' );
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

## Specifying entry points

You can also specify the specific entries you'd like to create RTL versions for, by passing them into the constructor:
```
Encore
	.addPlugin( new CSSJanusWebpackPlugin( [ 'app' ] ) );
```

# To use this in templates

In your templates, you can use the RTL stylesheet conditionally when attaching to the twig template.
For example, if you're using Intuition (or Wikimedia's ToolforgeBundle, which includes Intuition) you can utilize the is_rtl() method to attach an RTL css conditionally:

```
<link rel="stylesheet" type="text/css" href="{% if is_rtl() %}{{ asset('assets/rtl.app.css') }}{% else %}{{ asset('assets/app.css') }}{% endif %}" />
```


# Development

Please report any bugs or improvement requests in [the github issues](https://github.com/mooeypoo/cssjanus-webpack/issues).

Report any bugs or improvement requests to CSSJanus [directly in its repo](https://github.com/cssjanus/cssjanus/issues).
