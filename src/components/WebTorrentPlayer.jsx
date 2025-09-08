import React, { useEffect, useRef } from 'react';
import WebTorrentPlayer from 'webtorrent-player';
import '../../public/lib/webtorrent-player.css';

if (typeof window !== 'undefined') {
  window.navNowPlaying = () => {};
}

// The static HTML structure required by the webtorrent-player library.
// React will not manage this DOM; we inject it once.
const playerHTML = `
  <video class="video"></video>
  <div class="damage"></div>
  <div class="poster"></div>
  <div class="controls">
    <div class="icon play"></div>
    <div class="icon pause"></div>
    <div class="icon fullscreen"></div>
    <div class="icon exit-fullscreen"></div>
    <div class="icon cast"></div>
    <div class="icon exit-cast"></div>
    <div class="progress">
      <div class="progress-bar"></div>
      <div class="progress-handle"></div>
    </div>
    <div class="time">
      <span class="current">0:00</span> / <span class="duration">0:00</span>
    </div>
    <div class="volume">
      <div class="icon volume-high"></div>
      <div class="icon volume-low"></div>
      <div class="icon volume-off"></div>
      <div class="volume-bar"></div>
      <div class="volume-handle"></div>
    </div>
    <div class="subtitles"></div>
  </div>
  <div class="files"></div>
  <div class="subs"></div>
`;

const WebTorrentPlayerComponent = ({ magnetURI }) => {
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);

  useEffect(() => {
    // Don't do anything until we have a magnet link and the container is rendered.
    if (!magnetURI || !playerRef.current) return;

    // The container is ready and has the inner HTML. Now, find the video tag inside it.
    const videoEl = playerRef.current.querySelector('video.video');

    if (!videoEl) return; // Guard against the HTML not being there for some reason.

    // Instantiate the player, telling it which element contains the whole UI.
    playerInstanceRef.current = new WebTorrentPlayer({ el: playerRef.current });

    // Start playing the torrent, and tell the player to use our specific video tag.
    playerInstanceRef.current.playTorrent(magnetURI, videoEl);

    // Cleanup when the component unmounts or the magnet URI changes.
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [magnetURI]);

  return (
    // This section is the container for the player.
    // We use dangerouslySetInnerHTML to inject the static HTML the library needs.
    // React will create this section, but will not touch its children.
    <section
      ref={playerRef}
      className="player"
      dangerouslySetInnerHTML={{ __html: playerHTML }}
    />
  );
};

export default WebTorrentPlayerComponent;
