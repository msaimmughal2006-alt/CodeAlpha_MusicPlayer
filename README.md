# CodeAlpha Music Player

An interactive, responsive web-based music player developed using **HTML5**, **CSS3**, and **JavaScript** utilizing the **HTML5 Audio API** as part of the **CodeAlpha Frontend Development Internship** (Task 3: Build a Music Player).

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue?style=for-the-badge)
![API](https://img.shields.io/badge/Audio-HTML5%20Audio%20API-purple?style=for-the-badge)
![Task](https://img.shields.io/badge/CodeAlpha-Task%203-orange?style=for-the-badge)

---

## 📌 Project Overview

The **CodeAlpha Music Player** provides a rich and polished audio playback interface directly in the browser. Users can play/pause tracks, skip forward or back, seek through playback progress in real time, adjust audio volume, toggle mute, and switch between tracks using an interactive visual playlist.

---

## ✨ Features

### 🎵 Core Audio Playback Controls
- **Play & Pause**: Smoothly start and pause audio with synchronized icon transitions.
- **Track Navigation**: Skip forward to the **Next** track or return to the **Previous** track (circular loop around the playlist).
- **Dynamic Song Metadata**: Displays song title, artist name, and high-resolution album cover art.
- **Real-Time Duration**: Formats and displays both current playback time (`currentTime`) and total song duration (`duration`).

### 🎚️ Progress Tracking & Seeking
- **Interactive Progress Bar**: Live progress indicator showing playback percentage.
- **Click & Drag Scrubbing**: Click anywhere along the timeline or drag the thumb to jump to any point in the track.

### 🔊 Volume Control & Mute
- **Smooth Volume Slider**: Precision volume adjustment from 0% to 100%.
- **Instant Mute / Unmute**: Toggle mute with a single click while remembering previous volume settings.

### 🌟 CodeAlpha Bonus Features
- **Interactive Playlist**: Displays track collection with cover thumbnails, titles, artists, and live animated sound equalizer waves for the currently playing track. Click any track to play instantly.
- **Autoplay**: Automatically transitions to and plays the next track when the current song completes.

### 🎮 Additional Enhancements
- **Vinyl Disc Rotation Animation**: Album artwork smoothly spins like a vinyl record during playback and pauses when paused.
- **Shuffle & Repeat**:
  - **Shuffle Mode**: Plays tracks in randomized order.
  - **Repeat Mode**: Loops the current track continuously.
- **Full Physical Keyboard Shortcuts**:
  - `Space`: Play / Pause
  - `Arrow Right`: Seek forward 5s (`Shift + Arrow Right`: Next song)
  - `Arrow Left`: Seek backward 5s (`Shift + Arrow Left`: Previous song)
  - `Arrow Up`: Increase volume by 5%
  - `Arrow Down`: Decrease volume by 5%
  - `M`: Toggle mute

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` | Play / Pause audio |
| `→` (Right Arrow) | Seek forward 5 seconds |
| `←` (Left Arrow) | Seek backward 5 seconds |
| `Shift + →` | Skip to Next track |
| `Shift + ←` | Skip to Previous track |
| `↑` (Up Arrow) | Increase volume (+5%) |
| `↓` (Down Arrow) | Decrease volume (-5%) |
| `M` | Mute / Unmute audio |

---

## 💻 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic player card structure, audio element, and accessible controls |
| **CSS3** | Modern dark glassmorphic design, vinyl rotation keyframes, custom range sliders |
| **JavaScript (ES6+)** | Object-Oriented Player controller, event handling, playlist management |
| **HTML5 Audio API** | Native high-performance audio decoding and playback |

---

## 📂 Project Structure

```text
CodeAlpha_MusicPlayer/
│
├── index.html        # Main player layout, progress bars, & playlist markup
├── style.css         # Styling, vinyl animations, equalizer waves, & media queries
├── script.js         # Audio API controller, playback logic, & event listeners
│
├── music/            # Authentic Punjabi audio tracks & online streams
│   ├── song1.mp3     # Track 1: Famous — Sidhu Moose Wala
│   ├── song2.mp3     # Track 2: Amplifier — Imran Khan
│   └── song3.mp3     # Track 3: With You — AP Dhillon
│
├── images/           # High-resolution album artwork
│   ├── cover1.jpg    # Artwork 1 (Sidhu Moose Wala style)
│   ├── cover2.jpg    # Artwork 2 (Imran Khan / Luxury car aesthetic)
│   └── cover3.jpg    # Artwork 3 (AP Dhillon aesthetic)
│
└── README.md         # Comprehensive project documentation
```

---

## 🚀 How to Run the Project

No external dependencies, build tools, or packages required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeAlpha_MusicPlayer.git
   ```
2. Navigate into the project folder:
   ```bash
   cd CodeAlpha_MusicPlayer
   ```
3. Open `index.html` in your web browser:
   - **Double-click** `index.html`, OR
   - Right-click and choose **Open with > Chrome / Firefox / Edge / Safari**, OR
   - Serve using VS Code **Live Server** extension.

---

## 🧪 Testing Checklist

All functionality has been verified against the official CodeAlpha test criteria:

- [x] **Play**: Clicking Play starts playback and triggers vinyl disc rotation.
- [x] **Pause**: Clicking Pause stops playback and freezes the disc.
- [x] **Next**: Advances to the next track and updates metadata and cover art.
- [x] **Previous**: Navigates to the previous song (or restarts if played > 3s).
- [x] **Progress Bar**: Progress fill accurately reflects playback position.
- [x] **Seeking**: Clicking or dragging on the progress bar seeks instantly.
- [x] **Volume Control**: Slider updates volume from 0% to 100% with live badge.
- [x] **Mute**: Volume button toggles mute and restores prior volume.
- [x] **Song Info**: Title, artist, duration, and cover change per track.
- [x] **Playlist**: Clicking playlist items switches tracks with live equalizer indicator.
- [x] **Autoplay**: Moving to track end automatically triggers the next track.
- [x] **Responsive**: Clean display on mobile, tablet, and desktop viewports.

---

## 🎥 LinkedIn Demonstration Walkthrough

Follow this suggested outline when recording your video explanation:

1. **Introduction**:
   > *"Hello, my name is Muhammad Saim Ahmad. This is my Music Player project developed as part of my CodeAlpha Frontend Development Internship."*
2. **Technologies**:
   > *"I built this project using HTML5, CSS3, modern JavaScript, and the HTML5 Audio API."*
3. **Core Features**:
   - Press **Play** to start the music and demonstrate the rotating vinyl album artwork.
   - Show the **Next** and **Previous** buttons updating songs and cover art.
   - Demonstrate **Progress Seeking** by clicking different parts of the progress bar.
   - Adjust the **Volume Slider** and toggle the **Mute** button.
   - Demonstrate the **Playlist** (CodeAlpha Bonus Feature) by selecting another track directly.
   - Mention the **Autoplay** capability when a track ends.
   - Show physical **Keyboard Shortcuts** (`Space` to pause/play, Arrow keys).
4. **Responsive UI**:
   - Resize the browser window to showcase mobile adaptability.
5. **Conclusion**:
   - Highlight your key learning takeaways (audio lifecycle events, state management, UI animation).
   - Share your GitHub repository link in your post description.

---

## 👤 Author

- **Name**: Muhammad Saim Ahmad
- **Internship**: CodeAlpha Frontend Development Internship
- **Project**: Task 3 — Music Player
- **Organization**: [CodeAlpha](https://www.codealpha.tech/)
