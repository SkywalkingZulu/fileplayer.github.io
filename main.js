"use strict";function del(e){return api.subtitles.delay.bind(null,e)}"https:"===location.protocol&&(location="http"+location.href.substr(5)),function(){window.isOpera=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,window.isFirefox="undefined"!=typeof InstallTrigger,window.isSafari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,window.isIE=!!document.documentMode,window.isEdge=!isIE&&!!window.StyleMedia,window.isChrome=!!window.chrome&&!!window.chrome.webstore,window.isBlink=(isChrome||isOpera)&&!!window.CSS,window.utils={secondsToString:function(e){var t=~~(e%60),i=~~(e/60)%60,n=~~(e/3600);return 10>t&&(t="0"+t),10>i&&(i="0"+i),(n?n+":":"")+i+":"+t},range:function(e,t,i,n){var l=+t;return t.length&&"="===t[1]&&(l=(n||0)+t.substr(2)*(t[0]+"1")),Math.min(Math.max(e,l),i)},fPercent:function(e){return Math.round(100*e)+" %"}}}(),function(){window.dom={window:$(window),doc:$(document),body:$(document.body),title:$("title"),fileplayer:$(".fileplayer"),screen:$(".screen"),screenImage:$(".screen .image"),screenBrightness:$(".screen .brightnessWrapper"),screenVideo:$(".screen video.webaudio"),screenVideoDistant:$(".screen video:not(.webaudio)"),screenCanvas:$(".screen canvas"),screenFilename:$(".screen .filenameWrapper"),screenFilenameText:$(".screen .filename"),screenShortcutText:$(".screen .shortcutDesc"),screenCueWrapper:$(".screen .cues"),screenCue:$(".screen .cues > *"),numVersion:$(".screen .num"),playlist:$(".playlist"),playlistExtendWidth:$(".playlist .extendWidth"),playlistContent:$(".playlist .content"),playlistList:$(".playlist .list"),playlistInputFile:$(".playlist input[type='file']"),playlistNav:$(".playlist nav"),playlistNavIndex:$(".playlist nav .current"),playlistNavTotal:$(".playlist nav .total"),playlistForm:$(".playlist nav form"),playlistInputURL:$(".playlist nav input"),playlistShuffleBtn:$(".playlist nav .shuffle"),playlistRepeatBtn:$(".playlist nav .repeat"),playlistCloseBtn:$(".playlist nav .close"),ctrl:$(".ctrl"),ctrlCutesliderPosition:$(".ctrl .cuteslider.position"),ctrlSliderPosTrack:$(".ctrl .cuteslider.position .cuteslider-track"),ctrlInputRangePosition:$(".ctrl .cuteslider.position input"),ctrlThumbnail:$(".ctrl .thumbnail"),ctrlThumbnailVideo:$(".ctrl .thumbnail video"),ctrlThumbnailCanvas:$(".ctrl .thumbnail canvas"),ctrlOpenBtn:$(".ctrl .open"),ctrlPlayBtn:$(".ctrl .play"),ctrlStopBtn:$(".ctrl .stop"),ctrlPrevBtn:$(".ctrl .prev"),ctrlNextBtn:$(".ctrl .next"),ctrlVolumeIcon:$(".ctrl .volume .fa"),ctrlVolumeSlider:$(".ctrl .volume input"),ctrlTimeText:$(".ctrl .txt.position"),ctrlTimeCurrent:$(".ctrl .position .current"),ctrlTimeRemaining:$(".ctrl .position .remaining"),ctrlTimeDuration:$(".ctrl .position .duration"),ctrlCaptureBtn:$(".ctrl .btn.capture"),ctrlVisualBtn:$(".ctrl .btn.visu"),ctrlVisualIcon:$(".ctrl .visu .fa"),ctrlVisualToggle:$(".ctrl .visu .slidebutton"),ctrlVisualCheckbox:$(".ctrl .visu input"),ctrlVisualList:$(".ctrl .visu ul"),ctrlBrightnessIcon:$(".ctrl .brightness > .fa"),ctrlBrightnessSlider:$(".ctrl .brightness input"),ctrlBrightnessValue:$(".ctrl .brightness .val"),ctrlSpeedIcon:$(".ctrl .speed > .fa"),ctrlSpeedSlider:$(".ctrl .speed input"),ctrlSpeedValue:$(".ctrl .speed .val"),ctrlSubtitlesBtn:$(".ctrl .btn.subtitles"),ctrlSubtitlesIcon:$(".ctrl .subtitles .fa"),ctrlSubtitlesToggle:$(".ctrl .subtitles .slidebutton"),ctrlSubtitlesCheckbox:$(".ctrl .subtitles input"),ctrlSubtitlesList:$(".ctrl .subtitles ul"),ctrlPlaylistBtn:$(".ctrl .btn-playlist"),ctrlFullscreenBtn:$(".ctrl .btn.fullscreen")};for(var e in dom)0===dom[e].length&&console.error("dom."+e+" is empty.");dom.empty=$()}(),function(){var e=!1;window.api={version:"0.8.13",thumbnail:{}},window.ui={},dom.numVersion.text(api.version),document.body.onload=function(){e||(lg("body loaded"),e=!0,dom.fileplayer.addClass("ready"))},setTimeout(document.body.onload,3e3)}(),function(){function e(e){var t=e*e*e;i?o.gain.value=t:s.volume=t,ui.volume(a=e),Cookies.set("volume",e,{expires:365})}var t,i,n,l,o,a,r,s=dom.screenVideo[0];s.volume=1,window.AudioContext&&(i=new AudioContext,l=i.createAnalyser(),o=i.createGain(),o.gain.value=1,n=i.createMediaElementSource(s),n.connect(l),l.connect(o),o.connect(i.destination)),api.audio=t={ctx:i,analyser:l,volume:function(i){return 0===arguments.length?a:(e(utils.range(0,i,1,a)),r=a,t)},mute:function(){return r=a,e(0),t},unMute:function(){return e(r||1),t},isMuted:function(){return 0===a},muteToggle:function(e){return"boolean"!=typeof e&&(e=!t.isMuted()),e?t.mute():t.unMute()}}}(),function(){var e=document.createElement("canvas"),t=e.getContext("2d");$.extend(api,{capture:function(){var i,n,l,o=api.video.currentTime(),a=~~(o/3600),r=~~(o/60)%60,s=o%60,u=api.playlist.selectedFile();return 10>r&&(r="0"+r),s=(10>s?"0":"")+s.toFixed(2),"audio"===u.type?i=dom.screenCanvas[0]:(i=e,n=i.width=api.videoElement.videoWidth,l=i.height=api.videoElement.videoHeight,t.drawImage(api.videoElement,0,0,n,l)),{href:i.toDataURL(),download:u.name.replace(/\s/g,"_")+"__at_"+a+"h"+r+"m"+s+"s.png"}}})}(),function(){var e;api.error=e={"throw":function(t,i){var n,l;switch(t){case"INVALID_FORMAT":n="Incompatible file format",l='The file "'+i.filename+'" can not be played. Its format ('+i.format+") is not compatible with the <video> HTML5 standard element.";break;case"UNKNOWN_EXT":n="Incompatible file format",l='The file "'+i.filename+"\" can not be played. Its format is not recognized or maybe your browser doesn't support folders.";break;case"INVALID_URL":n="URL, HTTP error "+i.code,l='Can not access to the URL :\n"'+i.url+'" (error '+i.code+").";break;case"URL_NOT_CORS":n="URL, security, CORS error",l='The URL "'+i.url+"\" can't be reached.";break;case"CTRLO_SHORTCUT":n="Browser drawback, security",l="Ctrl+O is not working on your browser. Use the folder icon (in the lower left corner) or drag and drop your files directly.";break;case"WEBAUDIO":n="Browser drawback",l="WebAudio is not supported by your browser so, the sound visualiser is disable. Use a modern browser for a better experience.";break;case"NO_FOLDERS":n="Browser drawback",l="Folders are not supported by your browser.",l+=i?' "'+i.filename+"\" can't be played.":""}return setTimeout(function(){alert(n+" :\n\n"+l)},1),e}}}(),function(){var e="mp3-ogg-wav-weba",t="mp4-ogm-mpeg-mpg-webm",i="mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm-srt-vtt".split("-");api.file=function(n){var l,o=n.name||n.url,a=o.match(/([^/?#]*)\.([^./?#]+)/g);this.name=o,a&&(a=a[a.length-1],l=a.lastIndexOf("."),this.name=a,l>=0&&(this.name=a.substr(0,l),this.extension=a.substr(l+1).toLowerCase())),this.isSupported=$.inArray(this.extension,i)>-1,this.isLocal=!!n.name,this.isSupported&&(this.type=e.indexOf(this.extension)>-1?"audio":t.indexOf(this.extension)>-1?"video":"text",this.isLocal?this.dataFile=n:(this.url=o,this.cors=n.cors))},api.file.prototype={createURL:function(){return this.isLocal&&(this.url=URL.createObjectURL(this.dataFile)),this},revokeURL:function(){return this.isLocal&&URL.revokeObjectURL(this.url),this}}}(),function(){$.extend(document,{fullscreen:function(e){e.requestFullscreen=e.requestFullscreen||e.msRequestFullscreen||e.mozRequestFullScreen||e.webkitRequestFullscreen||$.noop,e.requestFullscreen()},exitFullscreen:document.exitFullscreen||document.msExitFullscreen||document.mozCancelFullScreen||document.webkitCancelFullScreen||$.noop,toggleFullscreen:function(e,t){1===arguments.length&&(t=!document.isFullscreen()),t?document.fullscreen(e):document.exitFullscreen()},isFullscreen:function(){return document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen||null!=document.msFullscreenElement||!1}})}(),function(){var e,t,i,n,l,o,a=[],r={ENTER:13,LEFT:37,UP:38,RIGHT:39,DOWN:40,PLUS:107,MINUS:109};for(t=0;12>t;++t)r["F"+(t+1)]=112+t;api.keyboard=e={shortcut:function(t,s){return i=n=l=!1,t.toUpperCase().split("+").forEach(function(e){switch(e){case"CTRL":i=!0;break;case"SHIFT":n=!0;break;case"ALT":l=!0;break;default:o=r[e]||e.charCodeAt(0)}}),a.push({ctrl:i,shift:n,alt:l,key:o,fn:s}),e}},dom.doc.keydown(function(e){for(var t,i=0;t=a[i];++i)if(t.key===e.keyCode&&t.ctrl===(e.ctrlKey||e.metaKey)&&t.shift===e.shiftKey&&t.alt===e.altKey)return t.fn(),!1})}(),function(){$.extend(api,{isLoading:!1,isLoaded:!1,videoElement:dom.screenVideo,loadFile:function(e){var t=e.isLocal||e.cors,i=api.video.loop();return api.video.pause(),api.isLoading=!0,api.isLoaded=!1,api.video.type=e.type,dom.fileplayer.toggleClass("webaudio",t),api.videoElement=(t?dom.screenVideo:dom.screenVideoDistant)[0],api.videoElement.src=e.url,api.video.loop(i),"video"===e.type&&dom.ctrlThumbnailVideo.attr({crossOrigin:t?"anonymous":null,src:e.url}),ui.loading().seeking(),api},fileLoaded:function(){return api.isLoading=!1,api.isLoaded=!0,api.imageRatio=api.videoElement.videoWidth/api.videoElement.videoHeight,api.video.playbackRate(1),ui.updimVideo().updimSubtitles(),api}})}(),function(){var e,t,i=!1,n=dom.empty,l=dom.empty,o=dom.playlistList;api.playlist=e={dialogueFiles:function(){return dom.playlistInputFile.click(),e},addFiles:function(t,i){function n(e,t,i,n){var l=new Promise(function(e,n){t.onload=function(t){return o.push(i),e(i)},t.onerror=function(t){return api.error["throw"]("NO_FOLDERS",{filename:i.name}),e(i)}});return t.readAsText(n),l}var l,o=[],a=[],r=[];return $.each(t,function(e){var t,i=new api.file(this);i.index=e,"text"===i.type?a.push(i):"audio"!==i.type&&"video"!==i.type&&window.isFirefox&&(t=new FileReader(this))?r.push(n(e,t,i,this)):o.push(i)}),Promise.all(r).then(function(){o.sort(function(e,t){return e.index-t.index}),l=ui.listAdd(o),ui.listUpdate().totalFiles(),i&&l.length&&e.select(l[0]),$.each(a,function(){api.subtitles.newTrack(this)})}),e},extractAddFiles:function(t,i){function n(){0===--r&&e.addFiles(s,i)}function l(e){e.isFile?e.file(function(e){s.push(e),n()}):e.isDirectory&&(a=e.createReader(),a.readEntries(function(e){r+=e.length,n(),$.each(e,function(){l(this)})}))}var o,a,r=t.length,s=[];return $.each(t,function(){(o=this.webkitGetAsEntry())&&l(o)}),e},select:function(t,i){if(t){var n=t.fileWrapper;n.createURL(),l.length&&l[0]!==t&&l[0].fileWrapper.revokeURL(),ui.fileSelect(t.jqThis).indexFile(),api.subtitles.disable(),i||ui.scrollToSelection(),l=t.jqThis,n.isSupported?(api.loadFile(n),api.video.play()):(api.error["throw"](n.extension?"INVALID_FORMAT":"UNKNOWN_EXT",{filename:n.name,format:n.extension}),api.video.stop())}else api.video.stop();return e},selectedFile:function(){return(l[0]||null)&&l[0].fileWrapper},prev:function(){return e.select(l.prev()[0]||ui.jqFiles.get(-1))},next:function(){return e.select(l.next()[0]||ui.jqFiles.get(0))},shuffle:function(t){if("boolean"!=typeof t&&(t=!i),t!==i){var a=ui.jqFiles.length;t?a>1&&(n=o.children(),ui.jqFiles.each(function(){ui.jqFiles.eq(Math.floor(Math.random()*a)).after(this)}),o.prepend(l)):o.prepend(n),ui.shuffle(i=t).listUpdate().indexFile().scrollToSelection()}return e},repeat:function(i){return arguments.length?(t=i,api.video.loop("loopOne"===i),ui.repeat(i),Cookies.set("playlistmode",i,{expires:365}),e):t}}}(),function(){var e;api.request=e={checkCORS:function(t,i){var n=0;return $.ajax({url:t,dataType:"text",xhrFields:{onprogress:function(e){n++||(i(200<=this.status&&this.status<300),this.abort())}},error:function(){n++||i(!1)},success:function(){n++||i(!0)}}),e}}}(),function(){var e,t;api.screen=e={brightness:function(i){return 0===arguments.length?t:(t=utils.range(0,i,1,t),ui.brightness(t),Cookies.set("brightness",t,{expires:365}),e)},brightnessToggle:function(i){return"boolean"!=typeof i&&(i=1>t),e.brightness(i?1:.25)}}}(),function(){function e(e){function t(e){var t=e.split(":");return t[2]=+t[2].replace(",","."),3600*t[0]+60*t[1]+t[2]}for(var i,n,l,o,a=0,r=[],s=e.split(/\s*\n\s*\n/);i=s[a++];)i=/\d+.*\s+([\d:,.]+)\s*-->\s*([\d:,.]+).*\s+((.|\s)*)/.exec(i),i&&r.push({id:r.length+1,startTime:t(i[1]),endTime:t(i[2]),text:i[3].replace(/\s*\n\s*/g,"<br>")});for(r.map=o=new Array(~~r[r.length-1].endTime+1),a=0;i=r[a];++a)for(n=~~i.startTime,l=~~i.endTime;l>=n;++n)o[n]||(o[n]=i);return r}var t,i,n=dom.empty,l=!1,o=0;api.subtitles=t={newTrack:function(l){var o=new FileReader;return o.onloadend=function(){var a=e(o.result),r=$("<li>");r.text(l.dataFile.name).appendTo(dom.ctrlSubtitlesList).click(function(){i=a,n.removeClass("selected"),n=r.addClass("selected"),ui.subtitlesCue(t.findCue()),api.subtitles.enable()}).click()},o.readAsText(l.dataFile),t},isEnable:function(){return l},enable:function(){return ui.subtitlesToggle(l=!0),t},disable:function(){return ui.subtitlesToggle(l=!1),t},toggle:function(e){return"boolean"!=typeof e&&(e=!l),e?t.enable():t.disable()},findCue:function(){if(l&&i){var e=api.video.currentTime()+o,t=i.map[~~e];if(t)do{if(e<t.startTime)return;if(e<=t.endTime)return t}while(t=i[t.id]);return t}},delay:function(e){return arguments.length?(ui.subtitlesDelay(o=utils.range(-(1/0),e,+(1/0),o)),t):o}}}(),function(){var e,t,i=[];api.thumbnail.cache=e={init:function(n){return t=0,i=new Array(n),e},newImage:function(n,l){return i[n]=l,++t,e},getImage:function(e,t){var n;if(e=~~e,t)for(var l=0;t>l&&!(n=i[e-l]||i[e+l]);++l);else n=i[e];return n}}}(),function(){var e,t=dom.ctrlThumbnailVideo[0],i=dom.ctrlThumbnailCanvas,n=i[0],l=n.getContext("2d"),o=i.width(),a=i.height(),r=o/a,s=null;n.width=o,n.height=a,api.thumbnail.canvas=e={drawFromImg:function(t){return t?t!==s&&l.putImageData(s=t,(o-t.width)/2,(a-t.height)/2):s&&(s=null,l.clearRect(0,0,o,a)),e},drawFromVideo:function(){var i,n,u,c;return api.imageRatio>r?(u=o,c=o/api.imageRatio,i=0,n=(a-c)/2):(u=a*api.imageRatio,c=a,i=(o-u)/2,n=0),l.drawImage(t,i,n,u,c),s=l.getImageData(i,n,u,c),api.thumbnail.cache.newImage(~~t.currentTime,s),e}}}(),function(){var e;dom.screenVideo[0].crossOrigin="anonymous",api.video=e={isStopped:!0,isPlaying:!1,play:function(){if(!e.isPlaying){var t=api.playlist.selectedFile();api.isLoaded||api.isLoading?(e.isStopped=!1,e.isPlaying=!0,api.videoElement.play(),ui.play()):t?api.playlist.select(t.element):api.playlist.dialogueFiles()}return e},pause:function(){return e.isPlaying&&(e.isPlaying=!1,api.videoElement.pause(),ui.pause()),e},playToggle:function(t){return"boolean"!=typeof t&&(t=!e.isPlaying),t?e.play():e.pause()},stop:function(){return e.isStopped||(e.pause().currentTime(0),api.isLoaded=e.isPlaying=!1,e.isStopped=!0,dom.ctrlThumbnailVideo[0].pause(),ui.canvasToggle(!1).stop()),e},duration:function(){return api.videoElement.duration||0},currentTime:function(t){return 0===arguments.length?api.videoElement.currentTime:(api.videoElement.currentTime=utils.range(0,t,api.videoElement.duration,api.videoElement.currentTime),e)},loop:function(t){return 0===arguments.length?api.videoElement.loop:(api.videoElement.loop=!!t,e)},playbackRate:function(t){return 0===arguments.length?api.videoElement.playbackRate:(api.videoElement.playbackRate=t,ui.speed(t),e)}}}(),function(){var e,t,i,n={},l=dom.empty,o=api.audio.analyser;o&&(o.fftSize=4096,t={analyser:o,data:new Uint8Array(o.frequencyBinCount)}),api.visualisations=e={enable:!1,add:function(t,i){return n[t]=i,$("<li data-name='"+t+"'>"+t+"</li>").appendTo(dom.ctrlVisualList).click(e.select.bind(null,t)),e},select:function(o){return i!==n[o]&&(l.removeClass("selected"),l=dom.ctrlVisualList.find("[data-name='"+o+"']").addClass("selected"),i=n[o],ui.canvasRender(i,t)),e},toggle:function(t){return"boolean"!=typeof t&&(t=!e.enable),t&&!api.audio.ctx&&(t=!1,api.error["throw"]("WEBAUDIO")),"audio"===api.video.type&&ui.canvasToggle(t),ui.visualisationsToggle(t),e.enable=t,e}}}(),function(){var e;$.extend(ui,{actionDescEnable:!0,actionDesc:function(t){return ui.actionDescEnable&&(clearTimeout(e),dom.screenShortcutText.text(t).removeClass("hidden"),e=setTimeout(function(){dom.screenShortcutText.addClass("hidden")},2e3)),ui}})}(),$.extend(ui,{brightness:function(e){return dom.screenBrightness.css("opacity",e),dom.ctrlBrightnessSlider.element().val(e),dom.ctrlBrightnessIcon.removeClass("fa-moon-o fa-lightbulb-o").addClass(.5>e?"fa-moon-o":"fa-lightbulb-o"),dom.ctrlBrightnessValue.text(utils.fPercent(e)),ui}}),function(){var e=[],t=0;$.extend(ui,{buffered:function(){var i,n,l,o=api.video.duration(),a=api.videoElement.buffered,r=a.length;for(i=r-e.length;i-- >0;)l=$("<div class='buffer'>").hide(),e.push({jqBuf:l}),dom.ctrlSliderPosTrack.append(l);if(n=e.length,t!==r){for(i=0;n>i;++i)e[i].jqBuf.toggle(r>i);t=r}for(i=0;r>i;++i){var s=a.start(i),u=a.end(i),c=e[i];c.b!==u&&(c.b=u,c.jqBuf.css({left:s/o*100+"%",width:(u-s)/o*100+"%"}))}return ui}})}(),function(){function e(l){i.timestamp=l,n(i),ui.canvasDisplayed&&(t=requestAnimationFrame(e))}var t,i,n=$.noop,l=dom.screenCanvas[0],o=l.getContext("2d");$.extend(ui,{canvasDisplayed:!1,canvasToggle:function(i){return"boolean"!=typeof i&&(i=!ui.canvasDisplayed),ui.canvasDisplayed=i,o.clearRect(0,0,l.width,l.height),dom.fileplayer.toggleClass("canvas-displayed",i),i?t||(t=requestAnimationFrame(e)):(cancelAnimationFrame(t),t=null),ui},canvasRender:function(e,t){return n=e||$.noop,i=$.extend(t,{ctxCanvas:o}),ui}})}(),$.extend(ui,{currentTime:function(e){return ui.subtitlesCue(api.subtitles.findCue()),dom.ctrlCutesliderPosition.element().val(e),dom.ctrlTimeCurrent.text(utils.secondsToString(e)),dom.ctrlTimeRemaining.text(utils.secondsToString(api.video.duration()-e)),clearTimeout(ui.seekTimeout),api.video.isPlaying&&(ui.seekTimeout=setTimeout(ui.seeking,700)),ui},duration:function(e){return dom.ctrlTimeDuration.text(utils.secondsToString(e)),ui}}),function(){var e;$.extend(ui,{fileDetach:function(t){return t&&(t.addClass("dragging"),e=setTimeout(function(){t.detach(),ui.listUpdate()},200)),ui},fileReattach:function(t){return clearTimeout(e),ui.listAdd(t),setTimeout(function(){t.removeClass("dragging")},1),ui}})}(),$.extend(ui,{jqFileSelected:dom.empty,fileSelect:function(e){function t(e,t,i){t=t&&t.fileWrapper,e[0].dataset.tooltipContent=t?i+"&nbsp;: <span class='filename' data-type='"+t.type+"'>"+t.name+"</span>":""}var i=e[0].fileWrapper;return t(dom.ctrlPrevBtn,e.prev()[0]||ui.jqFiles.get(-1),"Previous"),t(dom.ctrlNextBtn,e.next()[0]||ui.jqFiles[0],"Next"),ui.jqFileSelected.removeClass("selected"),ui.jqFileSelected=e.addClass("selected"),ui.canvasToggle("audio"===i.type&&api.visualisations.enable),ui}}),function(){var e;$.extend(ui,{fullscreenToggle:function(t){return"boolean"!=typeof t&&(t=!document.isFullscreen()),t?(e=ui.listIsOpen,ui.listClose()):e&&ui.listOpen(),dom.ctrlFullscreenBtn.removeClass("fa-compress fa-expand").addClass(t?"fa-compress":"fa-expand").attr("data-tooltip-content",t?"Exit full screen":"Full screen"),ui}})}(),$.extend(ui,{listAdd:function(e){var t="",i=e;return e.jquery||($.each(e,function(){t+="<a class='file' href='/' draggable='true'><div class='content textOverflow'><span class='filename' data-type='"+this.type+"'>"+this.name+"</span></div></a>"}),i=$(t).click(!1).dblclick(function(){return api.playlist.select(this,"noscroll"),!1}).each(function(t){e[t].element=this,this.fileWrapper=e[t],this.jqThis=$(this)})),ui.jqDragover===dom.playlistList?i.appendTo(dom.playlistList):ui.jqDragover&&i.insertBefore(ui.jqDragover),ui.listDragOver(null).listUpdate(),i}}),$.extend(ui,{jqDragover:dom.playlistList,listDragOver:function(e){if(e!==ui.jqDragover){if(ui.jqDragover&&ui.jqDragover.removeClass("dragover"),e===dom.screen){var t,i=api.playlist.selectedFile();i&&(i=i.element.jqThis.next(),i.length&&(t=i[0].jqThis)),e=t||dom.playlistList}ui.jqDragover=e,e&&e.addClass("dragover")}return ui}}),$.extend(ui,{listIsOpen:!1,listOpenToggle:function(e){return"boolean"!=typeof e&&(e=!ui.listIsOpen),ui.listIsOpen=e,dom.fileplayer.toggleClass("list-open",e),e?(ui.showCtrl(),setTimeout(ui.updimFilename,250)):(ui.hideCtrl().updimFilename(),dom.playlistInputURL.blur()),dom.ctrlPlaylistBtn[0].dataset.tooltipContent=e?"Hide playlist":"Show playlist",Cookies.set("playlistshow",e,{expires:365}),ui},listOpen:function(){return ui.listOpenToggle(!0)},listClose:function(){return ui.listOpenToggle(!1)}}),$.extend(ui,{jqFiles:dom.empty,listUpdate:function(){return ui.jqFiles=dom.playlistList.children(),ui},indexFile:function(){return dom.playlistNavIndex.text(1+ui.jqFiles.index(ui.jqFileSelected)),ui},totalFiles:function(){return dom.playlistNavTotal.text(ui.jqFiles.length),ui}}),$.extend(ui,{listWidth:function(e){return dom.playlist.css("width",e+"%"),ui.percListWidth=dom.playlist.width()/ui.pxScreenWidth*100,ui.listIsOpen&&ui.updimFilename(),Cookies.set("playlistwidth",e,{expires:365}),ui}}),function(){var e=dom.ctrlCutesliderPosition.parent();$.extend(ui,{loading:function(){var t=api.playlist.selectedFile();return dom.fileplayer.removeClass("audio video").addClass("playing "+t.type),dom.screenFilenameText.attr("data-type",t.type).add(dom.title).text(t.name),dom.ctrlCutesliderPosition.element().val(0),e.attr("data-tooltip-content",null),api.thumbnail.canvas.drawFromImg(),ui},loaded:function(){var e=api.video.duration();return dom.ctrlInputRangePosition.attr("max",e),api.thumbnail.cache.init(Math.ceil(e)),ui}})}(),$.extend(ui,{play:function(){return dom.ctrlPlayBtn.removeClass("fa-play").addClass("fa-pause"),ui.actionDesc("Play")},pause:function(){return dom.ctrlPlayBtn.removeClass("fa-pause").addClass("fa-play"),ui.actionDesc("Pause")}}),$.extend(ui,{repeat:function(e){var t="<i class='repeatDot fa fa-circle'></i>";return dom.playlistRepeatBtn.removeClass("disable one all").addClass(e===!0?"":"loopOne"===e?"one":"loopAll"===e?"all":"disable").attr("data-tooltip-content","Playing mode&nbsp;:<br/><br/>"+(e===!1?t:"")+"&nbsp;&nbsp;stop after file<br/>"+(e===!0?t:"")+"&nbsp;&nbsp;stop after playlist<br/>"+("loopOne"===e?t:"")+"&nbsp;&nbsp;repeat one<br/>"+("loopAll"===e?t:"")+"&nbsp;&nbsp;repeat playlist<br/>"),ui}}),function(){var e=dom.playlistList;$.extend(ui,{scrollToSelection:function(){var t,i,n,l,o,a=3.25,r=e.children(".selected");return r.length&&(i=r.position().top,l=i-e[0].scrollTop,o=r.outerHeight(),(t=0>l)?i-=a*o:(n=e.height()-50,(t=l>n-o)&&(i-=n-++a*o)),t&&e.stop().animate({scrollTop:i},250)),ui}})}(),function(){var e=!1;$.extend(ui,{seekTimeout:null,seeking:function(){return e||(e=!0,dom.fileplayer.addClass("seeking")),ui},seeked:function(){return clearTimeout(ui.seekTimeout),e&&(e=!1,dom.fileplayer.removeClass("seeking")),ui}})}(),$.extend(ui,{shuffle:function(e){return dom.playlistShuffleBtn.toggleClass("enable",e).attr("data-tooltip-content","Shuffle <i class='fa fa-toggle-"+(e?"on":"off")+"'></i>"),ui}}),$.extend(ui,{speed:function(e){var t=e.toFixed(2)+"x";return dom.ctrlSpeedSlider.element().val(e),dom.ctrlSpeedValue.text(t),ui.actionDesc("Speed : "+t)}}),function(){var e=dom.ctrlCutesliderPosition.parent();$.extend(ui,{stop:function(){return dom.fileplayer.removeClass("playing audio video"),dom.screenFilenameText.empty(),dom.title.text("FilePlayer"),api.thumbnail.canvas.drawFromImg(),e.attr("data-tooltip-content",null),ui.pause().currentTime(0).duration(0).actionDesc("stop")}})}(),function(){var e;$.extend(ui,{subtitlesToggle:function(e){return ui.subtitlesCue(e?api.subtitles.findCue():null),dom.ctrlSubtitlesBtn.toggleClass("disable",!e),dom.ctrlSubtitlesCheckbox.attr("checked",e?"checked":null),ui},subtitlesCue:function(t){return t!==e&&((e=t)?dom.screenCue.html(t.text):dom.screenCue.empty()),ui},subtitlesDelay:function(e){return ui.actionDesc("Subtitles delay : "+e.toFixed(3)+" s").subtitlesCue(api.subtitles.findCue())}})}(),ui.updimCanvas=function(){var e=dom.screenCanvas[0];return e.width=ui.pxScreenWidth,e.height=ui.pxScreenHeight,ui},ui.updimFilename=function(){return dom.screenFilename.css("width",ui.listIsOpen?100-ui.percListWidth+"%":"100%"),ui},ui.updimList=function(){return ui.percListWidth=dom.playlist.width()/ui.pxScreenWidth*100,ui},ui.updimScreen=function(){var e=dom.screenVideo.width(),t=dom.screenVideo.height();return ui.pxScreenWidth=e,ui.pxScreenHeight=t,ui.screenRatio=e/t,ui},ui.updimSubtitles=function(){var e=(ui.pxScreenHeight-ui.pxVideoHeight)/2;return dom.screenCueWrapper.toggleClass("isUnderCtrl",80>e).css({bottom:e,fontSize:Math.max(10,ui.pxVideoWidth/100*2.5)+"px"}),ui},ui.updimVideo=function(){var e=api.imageRatio,t=ui.pxScreenWidth,i=ui.pxScreenHeight;return ui.pxVideoWidth=e>ui.screenRatio?t:i*e,ui.pxVideoHeight=e<ui.screenRatio?i:t/e,ui},$.extend(ui,{visualisationsToggle:function(e){return dom.ctrlVisualBtn.toggleClass("disable",!e),dom.ctrlVisualCheckbox.attr("checked",e?"checked":null),ui}}),$.extend(ui,{volume:function(e){return dom.ctrlVolumeIcon.removeClass("fa-volume-off fa-volume-down fa-volume-up").addClass(e?.5>e?"fa-volume-down":"fa-volume-up":"fa-volume-off"),dom.ctrlVolumeSlider.element().val(e),ui.actionDesc("Volume : "+utils.fPercent(e))}}),ui.windowResize=function(){return ui.updimScreen().updimVideo().updimList().updimFilename().updimCanvas().updimSubtitles()},dom.ctrlBrightnessSlider.change(function(){api.screen.brightness(this.value)}),dom.ctrlBrightnessIcon.click(api.screen.brightnessToggle),dom.ctrlCaptureBtn.click(function(){api.isLoaded&&dom.ctrlCaptureBtn.attr(api.capture())}),function(){var e,t;ui.showCtrl=function(){return clearTimeout(e),clearTimeout(t),dom.fileplayer.removeClass("ctrlHiding ctrlHidden").addClass("ctrlVisible"),ui},ui.hideCtrl=function(){return clearTimeout(e),ui.listIsOpen||(dom.fileplayer.addClass("ctrlHiding"),t=setTimeout(function(){dom.fileplayer.removeClass("ctrlVisible").addClass("ctrlHidden")},2e3)),ui},dom.fileplayer.mouseleave(ui.hideCtrl).add(dom.ctrl).mouseenter(ui.showCtrl),dom.screen.mousemove(function(){ui.showCtrl(),e=setTimeout(ui.hideCtrl,500)})}(),function(){function e(){a&&(ui.fileReattach(a),l&&api.playlist.select(a[0]),a=null),ui.listDragOver(null),o=!1,r=!1}function t(){s=Math.max(ui.jqFiles.outerHeight(),ui.jqFiles.eq(1).outerHeight())}dom.playlistInputFile.change(function(){ui.listDragOver(dom.screen),api.playlist.addFiles(this.files,!0)}),dom.ctrlOpenBtn.click(api.playlist.dialogueFiles),api.keyboard.shortcut("ctrl+o",function(){window.isFirefox&&api.error["throw"]("CTRLO_SHORTCUT"),api.playlist.dialogueFiles()});var i,n,l,o,a,r,s;dom.body.on({dragover:function(e){var a,r,u=e.pageX,c=e.pageY;return o=!0,u===i&&c===n||(i=u,n=c,!ui.listIsOpen||u<(1-ui.percListWidth/100)*ui.pxScreenWidth?(l=!0,ui.listDragOver(dom.screen)):(l=!1,r=dom.playlistList.position().top,c>=r&&(c=c-r+dom.playlistList[0].scrollTop,t(),a=ui.jqFiles.eq(Math.round(c/s)),ui.listDragOver(a[0]?a[0].jqThis:dom.playlistList)))),!1},drop:function(t){t=t.originalEvent;var i=t&&t.dataTransfer;return a?e():i&&(i.items?api.playlist.extractAddFiles(i.items,l):i.files&&(i.files.length?api.playlist.addFiles(i.files,l):api.error["throw"]("NO_FOLDERS"))),o=r=!1,!1},dragstart:function(e){r=!0,ui.listDragOver(dom.playlistList),o=!0,a=e.target.jqThis,ui.fileDetach(a)},dragend:function(){return e(),!1},dragbetterenter:function(){r=!1},dragbetterleave:function(){o&&(r=!0,l=!1,ui.listDragOver(dom.playlistList))},mousemove:function(){r&&e()}})}(),dom.playlistForm.submit(function(){var e=dom.playlistInputURL.val();return dom.playlistInputURL.val("").blur(),api.request.checkCORS(e,function(t){ui.listDragOver(dom.screen),api.playlist.addFiles([{url:e,cors:t}],!0)}),!1}),dom.playlistInputURL.keydown(function(e){e.stopPropagation()}),function(){var e=!1,t=dom.playlistExtendWidth;api.keyboard.shortcut("ctrl+l",ui.listOpenToggle),dom.ctrlPlaylistBtn.click(ui.listOpenToggle),dom.playlistCloseBtn.click(ui.listClose),t.mousedown(function(){e=!0,dom.body.addClass("ew-resize no-select"),t.addClass("hover")}),dom.doc.mouseup(function(){e=!1,dom.body.removeClass("ew-resize no-select"),t.removeClass("hover")}).mousemove(function(t){e&&ui.listWidth(100-t.originalEvent.pageX/ui.pxScreenWidth*100)})}(),dom.ctrlStopBtn.click(api.video.stop),dom.ctrlPlayBtn.click(api.video.playToggle),api.keyboard.shortcut("s",api.video.stop).shortcut(" ",api.video.playToggle),function(){function e(e){if(!api.video.isStopped){api.video.currentTime(e);var t=api.video.currentTime();ui.currentTime(t).actionDesc(utils.secondsToString(t)+" / "+utils.secondsToString(api.video.duration()))}}dom.ctrlInputRangePosition.change(function(){api.video.isStopped||api.video.currentTime(this.value)}),dom.ctrlTimeText.click(function(){dom.ctrlTimeText.toggleClass("remaining")}),api.keyboard.shortcut("left",e.bind(null,"-=1")).shortcut("right",e.bind(null,"+=1")).shortcut("shift+left",e.bind(null,"-=3")).shortcut("shift+right",e.bind(null,"+=3")).shortcut("alt+left",e.bind(null,"-=10")).shortcut("alt+right",e.bind(null,"+=10")).shortcut("ctrl+left",e.bind(null,"-=60")).shortcut("ctrl+right",e.bind(null,"+=60"))}(),function(){var e=[!1,!0,"loopOne","loopAll"];dom.playlistShuffleBtn.click(api.playlist.shuffle),dom.playlistRepeatBtn.click(function(){api.playlist.repeat(e[(1+$.inArray(api.playlist.repeat(),e))%e.length])}),api.keyboard.shortcut("p",api.playlist.prev).shortcut("n",api.playlist.next),dom.ctrlPrevBtn.click(api.playlist.prev),dom.ctrlNextBtn.click(api.playlist.next)}(),function(){function e(){document.toggleFullscreen(document.documentElement)}dom.window.resize(ui.windowResize),dom.ctrlFullscreenBtn.click(e),api.keyboard.shortcut("F11",e),dom.screen.dblclick(e),dom.doc.on("fullscreenchange MSFullscreenChange mozfullscreenchange webkitfullscreenchange",function(){lg("ON: fullscreenchange"),ui.fullscreenToggle(document.isFullscreen())})}(),function(){var e;dom.playlist.mouseenter(function(){dom.playlistList.stop(),clearTimeout(e)}).mouseleave(function(){e=setTimeout(ui.scrollToSelection,1500)})}(),function(){function e(e){for(var n,l=1,o=api.video.playbackRate();i>l;++l)if(o<=t[l]){n=t[0>e?l-1:l+ +(o===t[l])];break}api.video.playbackRate(n||o)}var t=[.02,.03,.06,.12,.25,.33,.5,.67,1,1.25,1.5,2,3,4,8,16,32,64],i=t.length;dom.ctrlSpeedSlider.change(function(){api.video.playbackRate(+this.value)}),dom.ctrlSpeedIcon.click(function(){api.video.playbackRate(1)}),api.keyboard.shortcut("minus",e.bind(null,-1)).shortcut("plus",e.bind(null,1))}(),dom.ctrlSubtitlesToggle.add(dom.ctrlSubtitlesIcon).click(api.subtitles.toggle),api.keyboard.shortcut("g",del("-=.05")).shortcut("h",del("+=.05")).shortcut("shift+g",del("-=.25")).shortcut("shift+h",del("+=.25")).shortcut("alt+g",del("-=1")).shortcut("alt+h",del("+=1")).shortcut("ctrl+g",del("-=5")).shortcut("ctrl+h",del("+=5")),function(){function e(e){e!==o&&n.toggleClass("loading",o=e)}function t(e){"video"===api.video.type&&(e?a.play():a.pause())}var i,n=dom.ctrlThumbnail,l=n.outerWidth()/2,o=!1,a=dom.ctrlThumbnailVideo[0],r=dom.ctrlCutesliderPosition,s=r.parent();a.muted=!0,dom.ctrlThumbnailVideo.on("timeupdate",function(){e(!1);var t=api.playlist.selectedFile();api.isLoaded&&"video"===t.type&&(t.isLocal||t.cors)&&!api.thumbnail.cache.getImage(~~a.currentTime)&&api.thumbnail.canvas.drawFromVideo()}),r.mouseenter(t.bind(null,!0)).mouseleave(t.bind(null,!1)).mousemove(function(t){if(!api.video.isStopped){var o=r.offset().left,u=t.pageX-o;if(u!==i){var c=r.width(),d=u/c*api.video.duration(),p=l-o;i=u,s.attr("data-tooltip-content",utils.secondsToString(d)),"video"===api.video.type&&(e(!0),a.paused&&a.play(),n.css("left",utils.range(p,u,c-p)),api.thumbnail.canvas.drawFromImg(api.thumbnail.cache.getImage(d,30)),a.currentTime=d)}}})}(),dom.screenVideo.add(dom.screenVideoDistant).on({loadedmetadata:function(){api.fileLoaded(),ui.loaded()},waiting:function(){ui.seeking()},seeked:function(){ui.seeked()},durationchange:function(){ui.duration(this.duration)},timeupdate:function(){ui.seeked().currentTime(this.currentTime).buffered()},ended:function(){var e=api.playlist.selectedFile(),t=api.playlist.repeat();"loopAll"===t||t===!0&&e.element.jqThis.next().length?api.playlist.next():api.video.stop()}}),dom.ctrlVisualToggle.add(dom.ctrlVisualIcon).click(api.visualisations.toggle),function(){var e=api.audio.volume;dom.ctrlVolumeIcon.click(api.audio.muteToggle),dom.ctrlVolumeSlider.change(function(){e(this.value)}),api.keyboard.shortcut("ctrl+down",e.bind(null,"-=.05")).shortcut("ctrl+up",e.bind(null,"+=.05")),dom.screen.on("wheel",function(t){
e(t.originalEvent.deltaY<0?"+=.05":"-=.05")})}();