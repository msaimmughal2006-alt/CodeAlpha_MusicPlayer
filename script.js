/**
 * CodeAlpha Music Player - Interactive Script (script.js)
 * Task 3: Build a Music Player - CodeAlpha Frontend Development Internship
 * Author: Muhammad Saim Ahmad
 * 
 * Features:
 * - Play / Pause with dynamic icon transitions & vinyl disc spin
 * - Next & Previous track navigation
 * - Real-time progress bar with drag/click seeking
 * - Volume control slider & instant mute toggle
 * - Current playback time & total song duration formatting
 * - Dynamic Playlist generation with live equalizer wave animation (Bonus Feature)
 * - Autoplay transition to next song upon track completion (Bonus Feature)
 * - Shuffle and Repeat single track modes
 * - Full physical keyboard shortcuts (Space, Arrows, Mute)
 */

class MusicPlayer {
  constructor() {
    // Song Database - Authentic Punjabi Edition
    this.songs = [
      {
        title: 'Famous',
        artist: 'Sidhu Moose Wala',
        src: 'music/song1.mp3',
        streamUrl: 'https://archive.org/download/famous-sidhu-moose-wala/Famous%20Sidhu%20Moose%20Wala.mp3',
        cover: 'images/cover1.jpg'
      },
      {
        title: 'Amplifier',
        artist: 'Imran Khan',
        src: 'music/song2.mp3',
        streamUrl: 'https://archive.org/download/amplifier-imran-khan_202510/Amplifier%20-%20Imran%20Khan.mp3',
        cover: 'images/cover2.jpg'
      },
      {
        title: 'With You',
        artist: 'AP Dhillon',
        src: 'music/song3.mp3',
        streamUrl: 'https://archive.org/download/with-you-ap-dhillon-official-music-video/With%20You%20-%20AP%20Dhillon%20%28Official%20Music%20Video%29.mp3',
        cover: 'images/cover3.jpg'
      }
    ];

    // State Variables
    this.songIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.isRepeat = false;
    this.isMuted = false;
    this.previousVolume = 0.8;
    this.isDraggingProgress = false;

    // Cache DOM Elements
    this.audio = document.getElementById('audioSource');
    this.card = document.getElementById('musicCard');
    this.coverArt = document.getElementById('coverArt');
    this.songTitle = document.getElementById('songTitle');
    this.songArtist = document.getElementById('songArtist');

    this.currentTimeEl = document.getElementById('currentTime');
    this.totalDurationEl = document.getElementById('totalDuration');
    this.progressTrackWrapper = document.getElementById('progressTrackWrapper');
    this.progressTrack = document.getElementById('progressTrack');
    this.progressFill = document.getElementById('progressFill');
    this.progressThumb = document.getElementById('progressThumb');

    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.iconPlay = document.getElementById('iconPlay');
    this.iconPause = document.getElementById('iconPause');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.shuffleBtn = document.getElementById('shuffleBtn');
    this.repeatBtn = document.getElementById('repeatBtn');

    this.volumeBtn = document.getElementById('volumeBtn');
    this.iconVolumeHigh = document.getElementById('iconVolumeHigh');
    this.iconVolumeMuted = document.getElementById('iconVolumeMuted');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.volumeValue = document.getElementById('volumeValue');

    this.playlistList = document.getElementById('playlistList');
    this.playlistBadge = document.getElementById('playlistBadge');

    this.init();
  }

  /**
   * Initializes player controls, audio events, and renders playlist
   */
  init() {
    this.renderPlaylist();
    this.loadSong(this.songIndex, false);
    this.setVolume(this.volumeSlider.value);

    this.initEventListeners();
    this.initKeyboardSupport();
  }

  /**
   * Attaches click and drag listeners to controls
   */
  initEventListeners() {
    // Play / Pause toggle
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());

    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prevSong());
    this.nextBtn.addEventListener('click', () => this.nextSong());

    // Shuffle and Repeat toggles
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

    // Audio lifecycle events
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.handleSongEnded());

    // Progress bar seeking (Click & Drag)
    this.progressTrackWrapper.addEventListener('click', (e) => this.seek(e));
    this.initProgressDragging();

    // Volume controls
    this.volumeSlider.addEventListener('input', (e) => {
      this.setVolume(e.target.value);
    });

    this.volumeBtn.addEventListener('click', () => this.toggleMute());
  }

  /**
   * Loads a song into the audio player
   * @param {number} index - Index of song in playlist
   * @param {boolean} shouldAutoPlay - Whether to trigger play immediately
   */
  loadSong(index, shouldAutoPlay = true) {
    this.songIndex = index;
    const song = this.songs[this.songIndex];

    this.songTitle.innerText = song.title;
    this.songArtist.innerText = song.artist;
    this.coverArt.src = song.cover;
    this.audio.src = song.src;

    // Direct online audio stream fallback
    this.audio.onerror = () => {
      if (song.streamUrl && this.audio.src !== song.streamUrl) {
        console.info('Switching to direct online audio stream for:', song.title);
        this.audio.src = song.streamUrl;
        if (this.isPlaying) {
          this.audio.play().catch(e => console.warn(e));
        }
      }
    };

    // Reset progress visuals
    this.progressFill.style.width = '0%';
    this.progressThumb.style.left = '0%';
    this.currentTimeEl.innerText = '0:00';

    this.updateActivePlaylistItem();

    if (shouldAutoPlay) {
      this.playSong();
    }
  }

  /**
   * Plays current audio track
   */
  playSong() {
    this.isPlaying = true;
    this.card.classList.add('is-playing');
    this.iconPlay.style.display = 'none';
    this.iconPause.style.display = 'block';

    this.audio.play().catch(error => {
      console.warn('Autoplay prevented or audio file loading:', error);
    });

    this.updateActivePlaylistItem();
  }

  /**
   * Pauses current audio track
   */
  pauseSong() {
    this.isPlaying = false;
    this.card.classList.remove('is-playing');
    this.iconPlay.style.display = 'block';
    this.iconPause.style.display = 'none';

    this.audio.pause();
    this.updateActivePlaylistItem();
  }

  /**
   * Toggles between play and pause
   */
  togglePlay() {
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  /**
   * Skips to previous track
   */
  prevSong() {
    // If playback has progressed past 3 seconds, restart current track first
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    if (this.isShuffle) {
      this.songIndex = this.getRandomIndex();
    } else {
      this.songIndex = (this.songIndex - 1 + this.songs.length) % this.songs.length;
    }

    this.loadSong(this.songIndex, true);
  }

  /**
   * Advances to next track
   */
  nextSong() {
    if (this.isShuffle) {
      this.songIndex = this.getRandomIndex();
    } else {
      this.songIndex = (this.songIndex + 1) % this.songs.length;
    }

    this.loadSong(this.songIndex, true);
  }

  /**
   * Handles autoplay behavior when a song completes
   */
  handleSongEnded() {
    if (this.isRepeat) {
      this.audio.currentTime = 0;
      this.playSong();
    } else {
      this.nextSong(); // Autoplay next track (CodeAlpha Bonus Feature)
    }
  }

  /**
   * Gets a random song index different from the current one
   * @returns {number}
   */
  getRandomIndex() {
    if (this.songs.length <= 1) return 0;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songs.length);
    } while (randomIndex === this.songIndex);
    return randomIndex;
  }

  /**
   * Toggles shuffle mode
   */
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.shuffleBtn.classList.toggle('active', this.isShuffle);
  }

  /**
   * Toggles repeat mode
   */
  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    this.repeatBtn.classList.toggle('active', this.isRepeat);
  }

  /**
   * Updates progress bar fill and current timestamp
   */
  updateProgress() {
    if (this.isDraggingProgress) return;

    const { duration, currentTime } = this.audio;
    if (isNaN(duration) || duration === 0) return;

    const progressPercent = (currentTime / duration) * 100;
    this.progressFill.style.width = `${progressPercent}%`;
    this.progressThumb.style.left = `${progressPercent}%`;

    this.currentTimeEl.innerText = this.formatTime(currentTime);
  }

  /**
   * Displays total song duration once metadata is loaded
   */
  updateDuration() {
    const { duration } = this.audio;
    if (!isNaN(duration)) {
      this.totalDurationEl.innerText = this.formatTime(duration);
    }
  }

  /**
   * Allows clicking along the progress bar to seek
   * @param {MouseEvent} e 
   */
  seek(e) {
    const rect = this.progressTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));

    if (!isNaN(this.audio.duration)) {
      this.audio.currentTime = ratio * this.audio.duration;
      this.updateProgress();
    }
  }

  /**
   * Enables smooth dragging on progress bar
   */
  initProgressDragging() {
    const onDrag = (e) => {
      if (!this.isDraggingProgress) return;
      const rect = this.progressTrack.getBoundingClientRect();
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));

      this.progressFill.style.width = `${ratio * 100}%`;
      this.progressThumb.style.left = `${ratio * 100}%`;

      if (!isNaN(this.audio.duration)) {
        this.currentTimeEl.innerText = this.formatTime(ratio * this.audio.duration);
      }
    };

    const stopDrag = (e) => {
      if (!this.isDraggingProgress) return;
      this.isDraggingProgress = false;
      const rect = this.progressTrack.getBoundingClientRect();
      const clientX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));

      if (!isNaN(this.audio.duration)) {
        this.audio.currentTime = ratio * this.audio.duration;
      }
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    this.progressTrackWrapper.addEventListener('mousedown', () => {
      this.isDraggingProgress = true;
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    });

    this.progressTrackWrapper.addEventListener('touchstart', () => {
      this.isDraggingProgress = true;
      document.addEventListener('touchmove', onDrag, { passive: true });
      document.addEventListener('touchend', stopDrag);
    });
  }

  /**
   * Sets audio volume and updates slider display
   * @param {number|string} val - Number 0 to 100
   */
  setVolume(val) {
    const volumeLevel = val / 100;
    this.audio.volume = volumeLevel;
    this.volumeSlider.value = val;
    this.volumeValue.innerText = `${Math.round(val)}%`;

    if (volumeLevel === 0) {
      this.isMuted = true;
      this.iconVolumeHigh.style.display = 'none';
      this.iconVolumeMuted.style.display = 'block';
    } else {
      this.isMuted = false;
      this.previousVolume = volumeLevel;
      this.iconVolumeHigh.style.display = 'block';
      this.iconVolumeMuted.style.display = 'none';
    }
  }

  /**
   * Toggles mute state
   */
  toggleMute() {
    if (this.isMuted) {
      const restoreVal = Math.round((this.previousVolume || 0.8) * 100);
      this.setVolume(restoreVal);
    } else {
      this.previousVolume = this.audio.volume;
      this.setVolume(0);
    }
  }

  /**
   * Dynamically renders playlist items in HTML
   */
  renderPlaylist() {
    this.playlistList.innerHTML = '';
    this.playlistBadge.innerText = `${this.songs.length} Tracks`;

    this.songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.className = `playlist-item ${index === this.songIndex ? 'active' : ''}`;
      li.setAttribute('data-index', index);
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      li.innerHTML = `
        <img src="${song.cover}" alt="${song.title}" class="item-thumb">
        <div class="item-details">
          <span class="item-title">${song.title}</span>
          <span class="item-artist">${song.artist}</span>
        </div>
        <div class="equalizer-wave" aria-hidden="true">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </div>
      `;

      li.addEventListener('click', () => {
        this.loadSong(index, true);
      });

      this.playlistList.appendChild(li);
    });
  }

  /**
   * Highlights the active playlist track and controls the equalizer wave
   */
  updateActivePlaylistItem() {
    const items = this.playlistList.querySelectorAll('.playlist-item');
    items.forEach((item, idx) => {
      if (idx === this.songIndex) {
        item.classList.add('active');
        if (this.isPlaying) {
          item.classList.add('playing');
        } else {
          item.classList.remove('playing');
        }
      } else {
        item.classList.remove('active', 'playing');
      }
    });
  }

  /**
   * Formats seconds into MM:SS format
   * @param {number} seconds 
   * @returns {string}
   */
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  /**
   * Desktop Keyboard accessibility controls
   */
  initKeyboardSupport() {
    window.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea')) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (e.shiftKey) {
            this.nextSong();
          } else {
            this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 5);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (e.shiftKey) {
            this.prevSong();
          } else {
            this.audio.currentTime = Math.max(0, this.audio.currentTime - 5);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.setVolume(Math.min(100, parseInt(this.volumeSlider.value) + 5));
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.setVolume(Math.max(0, parseInt(this.volumeSlider.value) - 5));
          break;
        case 'KeyM':
          this.toggleMute();
          break;
      }
    });
  }
}

// Instantiate player upon DOM readiness
document.addEventListener('DOMContentLoaded', () => {
  new MusicPlayer();
});
