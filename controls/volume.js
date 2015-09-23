(function() {

var
	elVideo = playerAPI.videoElement,
	jqBtnVol = $( ".btn.volume", playerAPI.jqControls ),
	jqIconVol = $( ".fa", jqBtnVol ),
	jqElement_cuteSlider = $( ".cuteSlider", jqBtnVol )
;

$.extend( playerAPI, {
	mute: function( b ) {
		if ( !arguments.length ) {
			return elVideo.muted;
		}
		elVideo.muted = b;
		if ( !b && !elVideo.volume ) {
			elVideo.volume = 1;
		}
		return this;
	},
	muteToggle: function() {
		return this.mute( !elVideo.muted && !!elVideo.volume );
	},
	volume: function( v ) {
		if ( !arguments.length ) {
			return elVideo.volume;
		}
		elVideo.volume = v =
			v < 0 ? 0 :
			v < 1 ? v : 1
		;
		if ( v ) {
			elVideo.muted = false;
		}
		return this;
	},
	volumeRelative: function( v ) {
		return this.volume( this.volume() + v );
	}
});

jqIconVol.click( function() {
	playerAPI.muteToggle();
	return false;
});

jqElement_cuteSlider.change( function() {
	playerAPI.volume( this.value );
});

function volRel( v ) {
	playerAPI
		.volumeRelative( v )
		.shortcutDesc(
			"Volume : " +
			Math.round( playerAPI.volume() * 100 ) +
			" %"
		)
	;
}

playerAPI
	// Control the volume with the keyboard.
	.addKeys( "ctrl+down", volRel.bind( null, -.05 ) )
	.addKeys( "ctrl+up",   volRel.bind( null, +.05 ) )
	.jqVideoElement
		// Control the volume with the vertical mouse scroll.
		.on( "wheel", function( e ) {
			volRel( e.originalEvent.deltaY < 0
				? +.05
				: -.05
			);
		})
		// Sync the UI/controls with `elVideo.volume`.
		.on( "volumechange", function() {
			jqIconVol
				.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
				.addClass(
					elVideo.muted || elVideo.volume === 0
						? "fa-volume-off"
						: elVideo.volume < .5
							? "fa-volume-down"
							: "fa-volume-up"
				)
			;
			jqElement_cuteSlider.element().val( elVideo.muted
				? 0
				: elVideo.volume
			);
		})
;

// Force the volume to the max by default
playerAPI.volume( 1 );

})();
