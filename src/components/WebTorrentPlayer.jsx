
import React, { useEffect, useRef } from 'react';
import WebTorrentPlayer from 'webtorrent-player';
import '../../public/lib/webtorrent-player.css'; // Import the player's CSS

const WebTorrentPlayerComponent = ({ magnetURI }) => {
  // Main element refs
  const playerRef = useRef(null); // The main container <section>
  const videoRef = useRef(null); // The <video> element

  // Control element refs
  const nowPlayingRef = useRef(null);
  const peersRef = useRef(null);
  const downSpeedRef = useRef(null);
  const upSpeedRef = useRef(null);
  const downloadFileRef = useRef(null);
  const ppToggleRef = useRef(null);
  const playLastRef = useRef(null);
  const rewindRef = useRef(null);
  const playPauseRefs = useRef([]); // Multiple play/pause buttons
  const forwardRef = useRef(null);
  const playNextRef = useRef(null);
  const openPlaylistRef = useRef(null);
  const toggleMuteRef = useRef(null);
  const setVolumeRef = useRef(null);
  const audioButtonRef = useRef(null);
  const selectAudioRef = useRef(null);
  const progressWrapperRef = useRef(null);
  const setProgressRef = useRef(null);
  const thumbnailRef = useRef(null);
  const captionsButtonRef = useRef(null);
  const selectCaptionsRef = useRef(null);
  const toggleCastRef = useRef(null);
  const togglePopoutRef = useRef(null);
  const toggleTheatreRef = useRef(null);
  const toggleFullscreenRef = useRef(null);

  const playerInstanceRef = useRef(null); // To hold the player instance

  useEffect(() => {
    if (playerInstanceRef.current || !videoRef.current) {
      return; // Already initialized or video element not ready
    }

    // A helper to add multiple refs for the same control
    const addRef = (el) => {
      if (el && !playPauseRefs.current.includes(el)) {
        playPauseRefs.current.push(el);
      }
    };
    
    // Create the player instance with all controls
    const player = new WebTorrentPlayer({
      video: videoRef.current,
      player: playerRef.current,
      controls: {
        nowPlaying: nowPlayingRef.current,
        peers: peersRef.current,
        downSpeed: downSpeedRef.current,
        upSpeed: upSpeedRef.current,
        downloadFile: downloadFileRef.current,
        ppToggle: ppToggleRef.current,
        playLast: playLastRef.current,
        rewind: rewindRef.current,
        playPause: playPauseRefs.current, // Pass array of elements
        forward: forwardRef.current,
        playNext: playNextRef.current,
        openPlaylist: openPlaylistRef.current,
        toggleMute: toggleMuteRef.current,
        setVolume: setVolumeRef.current,
        audioButton: audioButtonRef.current,
        selectAudio: selectAudioRef.current,
        progressWrapper: progressWrapperRef.current,
        setProgress: setProgressRef.current,
        thumbnail: thumbnailRef.current,
        captionsButton: captionsButtonRef.current,
        selectCaptions: selectCaptionsRef.current,
        toggleCast: toggleCastRef.current,
        togglePopout: togglePopoutRef.current,
        toggleTheatre: toggleTheatreRef.current,
        toggleFullscreen: toggleFullscreenRef.current,
      },
      // Add other options from the original example if needed
      burnIn: true,
      seekTime: 5,
      immerseTime: 5,
      generateThumbnails: true,
      visibilityLossPause: true
    });

    playerInstanceRef.current = player;
    
    // Cleanup on unmount
    return () => {
      player.destroy();
      playerInstanceRef.current = null;
    };
  }, []); // Run only once on mount

  // Effect to load torrent when magnetURI changes
  useEffect(() => {
    if (playerInstanceRef.current && magnetURI) {
      playerInstanceRef.current.playTorrent(magnetURI);
    }
  }, [magnetURI]);

  // A helper to add multiple refs for the same control
  const addRef = (el) => {
    if (el && !playPauseRefs.current.includes(el)) {
      playPauseRefs.current.push(el);
    }
  };

  return (
    <section ref={playerRef} className="torrent-player">
      <video ref={videoRef} src=""></video>
      <div className="top">
        <div ref={nowPlayingRef} data-name="nowPlaying" className="ctrl"></div>
        <div className='stats'>
          <span ref={peersRef} className="ctrl material-icons" data-value="0" data-name="peers">people</span>
          <span ref={downSpeedRef} className="ctrl material-icons" data-value="0 B/s" data-name="downSpeed">arrow_downward</span>
          <span ref={upSpeedRef} className="ctrl material-icons" data-value="0 B/s" data-name="upSpeed">arrow_upward</span>
        </div>
        <a ref={downloadFileRef} className="material-icons ctrl" title="Save File To Drive" data-name="downloadFile" href="" target="_blank">get_app</a>
      </div>
      <div className="middle">
        <div ref={ppToggleRef} className="ctrl" data-name="ppToggle"></div>
        <span ref={playLastRef} className="material-icons ctrl" data-name="playLast">skip_previous</span>
        <span ref={rewindRef} className="material-icons ctrl" data-name="rewind">fast_rewind</span>
        <span ref={addRef} className="material-icons ctrl" data-name="playPause">play_arrow</span>
        <span ref={forwardRef} className="material-icons ctrl" data-name="forward">fast_forward</span>
        <span ref={playNextRef} className="material-icons ctrl" data-name="playNext">skip_next</span>
        <div data-name="bufferingDisplay"></div>
      </div>
      <div className="bottom">
        <span ref={addRef} className="material-icons ctrl" title="Play/Pause [Space]" data-name="playPause">play_arrow</span>
        <span ref={playNextRef} className="material-icons ctrl" title="Next [N]" data-name="playNext">skip_next</span>
        <span ref={openPlaylistRef} className="material-icons ctrl" title="Playlist [P]" data-name="openPlaylist">playlist_play</span>
        <div className="volume">
          <span ref={toggleMuteRef} className="material-icons ctrl" title="Mute [M]" data-name="toggleMute">volume_up</span>
          <input ref={setVolumeRef} className="ctrl" type="range" defaultValue="100" id="volume" step="any" data-name="setVolume" />
        </div>
        <div className="audio-tracks popup">
          <span ref={audioButtonRef} className="material-icons ctrl" title="Audio Tracks [T]" disabled data-name="audioButton">queue_music</span>
          <div ref={selectAudioRef} className="popup-menu ctrl" data-name="selectAudio"></div>
        </div>
        <div ref={progressWrapperRef} className="ctrl" data-name="progressWrapper" data-elapsed="00:00" data-remaining="00:00">
          <div>
            <input ref={setProgressRef} className="ctrl" type="range" min="0" max="100" defaultValue="0" step="any" data-name="setProgress" />
            <img ref={thumbnailRef} className="ctrl" data-elapsed="00:00" data-name="thumbnail" alt="thumbnail" />
          </div>
        </div>
        <div className="subtitles popup">
          <span ref={captionsButtonRef} className="material-icons ctrl" title="Subtitles [C]" disabled data-name="captionsButton">subtitles</span>
          <div ref={selectCaptionsRef} className="popup-menu ctrl" data-name="selectCaptions"></div>
        </div>
        <span ref={toggleCastRef} className="material-icons ctrl" title="Cast Video [P]" data-name="toggleCast" disabled>cast</span>
        <span ref={togglePopoutRef} className="material-icons ctrl" title="Popout Window [P]" data-name="togglePopout">picture_in_picture</span>
        <span ref={toggleTheatreRef} className="material-icons ctrl" title="Theatre Mode [T]" data-name="toggleTheatre">crop_16_9</span>
        <span ref={toggleFullscreenRef} className="material-icons ctrl" title="Fullscreen [F]" data-name="toggleFullscreen">fullscreen</span>
      </div>
    </section>
  );
};

export default WebTorrentPlayerComponent;
