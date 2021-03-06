"use strict";

(function() {

var
	that,
	elVideo = dom.ctrlThumbnailVideo[ 0 ],
	jqCanvas = dom.ctrlThumbnailCanvas,
	elCanvas = jqCanvas[ 0 ],
	canvasCtx = elCanvas.getContext( "2d" ),
	canvasW = jqCanvas.width(),
	canvasH = jqCanvas.height(),
	canvasRatio = canvasW / canvasH,
	currentImg = null
;

elCanvas.width = canvasW;
elCanvas.height = canvasH;

api.thumbnail.canvas = that = {
	drawFromImg: function( img ) {
		if ( !img ) {
			if ( currentImg ) {
				currentImg = null;
				canvasCtx.clearRect( 0, 0, canvasW, canvasH );
			}
		} else if ( img !== currentImg ) {
			canvasCtx.putImageData(
				currentImg = img,
				( canvasW - img.width ) / 2,
				( canvasH - img.height ) / 2
			);
		}
		return that;
	},
	drawFromVideo: function() {
		var x, y, w, h;
		if ( api.imageRatio > canvasRatio ) {
			w = canvasW;
			h = canvasW / api.imageRatio;
			x = 0;
			y = ( canvasH - h ) / 2;
		} else {
			w = canvasH * api.imageRatio;
			h = canvasH;
			x = ( canvasW - w ) / 2;
			y = 0;
		}
		canvasCtx.drawImage( elVideo, x, y, w, h );
		currentImg = canvasCtx.getImageData( x, y, w, h );
		api.thumbnail.cache.newImage( ~~elVideo.currentTime, currentImg );
		return that;
	}
};

})();
