const songs = [
    {
      title: "CHANDRACHOODA",
      artist: "RAGHU",
      src: "CHANDRACHOODA ft Raghu.mp3",
      cover: "first.jpeg"
    },
    {
      title: "Pani Da Rang",
      artist: "Ayushmann Khurrana & Yami Gautam",
      src: "Pani Da Rang (Video Song) _ Vicky Donor _ Ayushmann Khurrana & Yami Gautam.mp3",
      cover: "second.jpeg"
    },
    {
      title: "Tum Hi Ho",
      artist: "Arijit Singh",
      src: "_Tum Hi Ho_ Aashiqui 2 Full Song With Lyrics _ Aditya Roy Kapur, Shraddha Kapoor.mp3",
      cover: "third.jpeg"
    }
  ];
  
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const cover = document.getElementById("cover");
  const seekbar = document.getElementById("seekbar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const volume = document.getElementById("volume");
  const playlist = document.getElementById("playlist");
  
  let currentSong = 0;
  
  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    highlightPlaylist(index);
  }
  
  function highlightPlaylist(index) {
    [...playlist.children].forEach((li, i) => {
      li.classList.toggle("active", i === index);
    });
  }
  
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸️";
    } else {
      audio.pause();
      playBtn.textContent = "▶️";
    }
  });
  
  audio.addEventListener("timeupdate", () => {
    seekbar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  
  audio.addEventListener("loadedmetadata", () => {
    seekbar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
  });
  
  seekbar.addEventListener("input", () => {
    audio.currentTime = seekbar.value;
  });
  
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });
  
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  }
  
  nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸️";
  });
  
  prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸️";
  });
  
  audio.addEventListener("ended", () => {
    nextBtn.click();
  });
  
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = "⏸️";
    });
    playlist.appendChild(li);
  });
  
  loadSong(currentSong);
  