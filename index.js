const cssjanus = require('cssjanus');

/**
 * A webpack plugin for CSSJanus
 * This plugin automatically takes all .css assets and produces a RTL version
 * asset with an rtl prefix.
 */
class CSSJanusWebpackPlugin {
	constructor( entries, config ) {
		config = config || {};
		entries = entries || [];

		this.entries = Array.isArray( entries ) ? entries : [ entries ];
		this.filePrefix = config.filePrefix || 'rtl.';
	}

	createRTLassets( compilation ) {
		const getAllEntries = () => {
			stats = compilation.getStats().toJson( {
				assets: true,
				chunks: false
			} );

			return Object.keys( stats.entrypoints );
		};
		const getCSSAssetEntryFile = ( file ) => {
			let entry;

			if ( !file.endsWith( '.css' ) ) {
				return '';
			}

			if ( !this.entries.length ) {
				this.entries = getAllEntries();
			}

			entry = this.entries.filter( ( entry ) => {
				return file.startsWith( entry );
			} )[ 0 ];
			return entry ? entry + '.css' : '';
		};
		let entryFile, originalFile,
			cssFiles = {};

		// Get all CSS files
		for ( let file in compilation.assets ) {
			entryFile = getCSSAssetEntryFile( file );
			if ( entryFile ) {
				cssFiles[ entryFile ] = file;
			}
		}

		// Run CSSJanus on CSS files and produce an alternate RTL version
		for ( entryFile in cssFiles ) {
			originalFile = cssFiles[ entryFile ];
			const rtlcontent = cssjanus.transform( compilation.assets[ originalFile ].source() );

			compilation.assets[ this.filePrefix + entryFile ] = {
				source: () => rtlcontent,
				length: () => rtlcontent.length
			}
		}
	}

	apply( compiler ) {
		compiler.hooks.make.tapAsync( 'CSSJanusWebpackPlugin', (compilation, rootCallback) => {
			compilation.hooks.additionalAssets.tapAsync( 'CSSJanusWebpackPlugin', callback => {
				this.createRTLassets( compilation );
				callback();
			} );
			rootCallback();
		} );
	}
}

module.exports = CSSJanusWebpackPlugin;
