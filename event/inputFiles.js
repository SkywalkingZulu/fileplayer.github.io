"use strict";

(function() {

// <input type="file" multiple/>
dom.playlistInputFile.change( function() {
	ui.listDragOver( dom.screen );
	api.playlist.addFiles( this.files, true );
});

dom.ctrlOpenBtn.click( api.playlist.dialogueFiles );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", function() {
	if ( window.isFirefox ) {
		api.error.throw( "CTRLO_SHORTCUT" );
	}
	api.playlist.dialogueFiles();
});

var
	dragX,
	dragY,
	autoplay,
	isDragging,
	jqFileDragging,
	dragOutside,
	fileHeight
;

function dragend() {
	if ( jqFileDragging ) {
		ui.fileReattach( jqFileDragging );
		if ( autoplay ) {
			api.playlist.select( jqFileDragging[ 0 ] );
		}
		jqFileDragging = null;
	}
	ui.listDragOver( null );
	isDragging = false;
	dragOutside = false;
}

function updateFileHeight() {
	fileHeight = Math.max(
		ui.jqFiles.outerHeight(),
		ui.jqFiles.eq( 1 ).outerHeight()
	);
}

dom.body.on({

	// When we are dragging over the player (not the playlist).
	dragover: function( e ) {
		var
			jq,
			listY,
			x = e.pageX,
			y = e.pageY
		;

		isDragging = true;

		// This if prevent ondragover to be called every ~100ms.
		if ( x !== dragX || y !== dragY ) {
			dragX = x;
			dragY = y;

			// Drag on the player.
			if ( !ui.listIsOpen || x < ( 1 - ui.percListWidth / 100 ) * ui.pxScreenWidth ) {
				autoplay = true;
				ui.listDragOver( dom.screen );

			// Drag on the playlist.
			} else {
				autoplay = false;
				listY = dom.playlistList.position().top;
				if ( y >= listY ) {
					y = y - listY + dom.playlistList[ 0 ].scrollTop;
					updateFileHeight();
					jq = ui.jqFiles.eq( Math.round( y / fileHeight ) );
					ui.listDragOver( jq[ 0 ] ? jq[ 0 ].jqThis : dom.playlistList );
				}
			}
		}

		// Prevent the browser to load the file directly in the tab.
		// e.preventDefault in the "drop" event is not enough.
		return false;
	},

	drop: function( e ) {
		e = e.originalEvent;
		var data = e && e.dataTransfer;

		if ( jqFileDragging ) {
			dragend();
		} else if ( data ) {
			// Chrome :
			if ( data.items ) {
				api.playlist.extractAddFiles( data.items, autoplay );
			// Everyone else :
			} else if ( data.files ) {
				if ( !data.files.length ) {
					// Folder detection for IE
					api.error.throw( "NO_FOLDERS" );
				} else {
					// Others browsers
					api.playlist.addFiles( data.files, autoplay );
				}
			}
		}
		isDragging =
		dragOutside = false;
		return false;
	},

	// dragstart/end concerns the internal dragndrop.
	// So they aren't called when you are dragging some files from your disk.
	dragstart: function( e ) {
		// If we drag out something directly out the window
		// the dragover event don't have the time to be fired.
		dragOutside = true;
		ui.listDragOver( dom.playlistList );

		isDragging = true;
		jqFileDragging = e.target.jqThis;
		ui.fileDetach( jqFileDragging );
	},
	dragend: function() {
		dragend();
		return false;
	},

	// cf. https://github.com/lolmaus/jquery.dragbetter
	// Detect when the mouse leave the window while dragging.
	dragbetterenter: function() {
		dragOutside = false;
	},
	dragbetterleave: function() {
		if ( isDragging ) {
			dragOutside = true;
			autoplay = false;
			ui.listDragOver( dom.playlistList );
		}
	},

	// Detect when we have dropped an intern file outside of the window.
	mousemove: function() {
		if ( dragOutside ) {
			dragend();
		}
	}
});

})();
