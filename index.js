const cssjanus = require('cssjanus');

/**
 * A webpack plugin for CSSJanus
 * This plugin automatically takes all .css assets and produces a RTL version
 * asset with an rtl prefix.
 */
class CSSJanusWebpackPlugin {
	constructor( config ) {
		config = config || {};

		this.filePrefix = config.filePrefix || 'rtl.';
	}
	apply( compiler ) {
		compiler.hooks.make.tapAsync( 'CSSJanusWebpackPlugin', (compilation, rootCallback) => {
			compilation.hooks.additionalAssets.tapAsync( 'CSSJanusWebpackPlugin', callback => {
				let cssFiles = [];

				// Get all CSS files
				for ( let file in compilation.assets ) {
					if ( file.endsWith( '.css' ) ) {
						cssFiles.push( file );
					}
				}

				// Run CSSJanus on CSS assets and produce an alternate RTL version
				// that is then added as an extra asset
				cssFiles.forEach( ( cssFile ) => {
					const rtlcontent = cssjanus.transform( compilation.assets[ cssFile ].source() );

					compilation.assets[ this.filePrefix + cssFile ] = {
						source: () => rtlcontent,
						length: () => rtlcontent.length
					}
				} );

				callback();
			} );
			rootCallback();
		} );
	}
}

module.exports = CSSJanusWebpackPlugin;
