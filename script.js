/* ===================================
   ÁLBUMES
   =================================== */

const albums = [
  {
    title: "Ten Days",
    artist: "fred again",
    cover: "assets/tenDaysCover.png",
    tracks: 10,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/3DQueEd1Ft9PHWgovDzPKh?utm_source=generator",
  },
  {
    title: "Polo & Pan",
    artist: "Polo & Pan",
    cover: "assets/poloYpanCover.png",
    tracks: 12,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/2XLO00VSPGAGxpUjezhHoC?utm_source=generator",
  },
  {
    title: "Caamp",
    artist: "Caamp / Iffy",
    cover: "assets/CaampIffyCover.png",
    tracks: 10,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/2vUB37lx6QDXvF7wPmPkFr?utm_source=generator",
  },
  {
    title: "Harry’s House",
    artist: "Harry Styles",
    cover: "assets/harrysHouseCover.png",
    tracks: 13,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/5r36AJ6VOJtp00oxSkBZ5h?utm_source=generator",
  },
  {
    title: "Actual Life",
    artist: "fred again",
    cover: "assets/fredAgainCover.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/6o86bV7TAt5x4exc2qLDqC?utm_source=generator",
  },
  {
    title: "Lux",
    artist: "Rosalia",
    cover: "assets/luxRosaliaCover.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/3SUEJULSGgBDG1j4GQhfYY?utm_source=generator",
  },
  {
    title: "Stick Season",
    artist: "Noah Kahan",
    cover: "assets/sitckSeasonCover.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/50ZenUP4O2Q5eCy2NRNvuz?utm_source=generator",
  },
  {
    title: "El Madrileño",
    artist: "C. Tangana",
    cover: "assets/covers_elMadrileño.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/52QyC9nSbgtHFXyQRHsXJ9?utm_source=generator",
  },
  {
    title: "hickey",
    artist: "Royel Ottis",
    cover: "assets/covers-04.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/7iX7uCkSNnkuIMwbjl8Jpf?utm_source=generator",
  },
  {
    title: "The Beatles",
    artist: "The Beatles",
    cover: "assets/covers_theBeatles.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/1klALx0u4AavZNEvC4LrTL?utm_source=generator",
  },
  {
    title: "Física & Química",
    artist: "Joaquin Sabina",
    cover: "assets/covers.png",
    tracks: 9,
    spotifyEmbed:
      "https://open.spotify.com/embed/album/6MeLjaERUK6fJ58YZpPlyC?utm_source=generator",
  },
];

let currentAlbumIndex = -1;

/* ===================================
   INICIO
   =================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderVinylShelf();
  initBackButton();
  initCustomCursor(); // 👈 ahora el cursor se inicializa cuando las cards ya existen
});

/* ===================================
   GRILLA DE ÁLBUMES
   =================================== */
function renderVinylShelf() {
  const vinylShelf = document.getElementById("vinyl-shelf");

  const totalSlots = 12; // cantidad de portadas en la pantalla
  for (let i = 0; i < totalSlots; i++) {
    const album = albums[i % albums.length];

    const card = document.createElement("article");
    card.className = "vinyl-card";
    card.setAttribute("data-index", i % albums.length);
    card.setAttribute("tabindex", "0");

    const img = document.createElement("img");
    img.src = album.cover;
    img.alt = `${album.title} - ${album.artist}`;

    const meta = document.createElement("div");
    meta.className = "album-meta";
    meta.innerHTML = `
      <p class="album-artist">${album.artist}</p>
      <p class="album-title">${album.title}</p>
      <p class="album-tracks">${album.tracks} songs</p>
    `;

    card.appendChild(img);
    card.appendChild(meta);
    vinylShelf.appendChild(card);

    card.addEventListener("click", () => {
      playAlbum(i % albums.length);
    });
  }
}

/* ===================================
   SELECCIONAR ÁLBUM
   =================================== */
function playAlbum(albumIndex) {
  currentAlbumIndex = albumIndex;
  const album = albums[albumIndex];

  // marcar activo en la grilla
  document.querySelectorAll(".vinyl-card").forEach((card) => {
    const idx = Number(card.getAttribute("data-index"));
    if (idx === albumIndex) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  showPlayerView(album);
}

/* ===================================
   MOSTRAR PANTALLA REPRODUCTOR
   =================================== */
function showPlayerView(album) {
  const libraryView = document.getElementById("library-view");
  const playerView = document.getElementById("player-view");
  const playerContainer = document.getElementById("center-player");

  document.getElementById("player-artist").textContent = album.artist;
  document.getElementById("player-title").textContent = album.title;

  playerContainer.innerHTML = `
    <iframe
      src="${album.spotifyEmbed}"
      width="100%"
      height="380"
      frameborder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      title="Spotify player - ${album.title}">
    </iframe>
  `;

  libraryView.style.display = "none";
  playerView.style.display = "flex";
}

/* ===================================
   VOLVER A LA BIBLIOTECA
   =================================== */
function showLibraryView() {
  const libraryView = document.getElementById("library-view");
  const playerView = document.getElementById("player-view");
  const playerContainer = document.getElementById("center-player");

  // limpiar reproductor
  playerContainer.innerHTML = "";

  // quitar selección
  document.querySelectorAll(".vinyl-card").forEach((card) => {
    card.classList.remove("active");
  });
  currentAlbumIndex = -1;

  playerView.style.display = "none";
  libraryView.style.display = "block";
}

function initBackButton() {
  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", showLibraryView);

  // ESC para volver
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const playerView = document.getElementById("player-view");
      if (playerView.style.display === "flex") {
        showLibraryView();
      }
    }
  });
}

/* ===========================
   CUSTOM ROTATING CURSOR
   =========================== */

function initCustomCursor() {
  const customCursor = document.getElementById("custom-cursor");
  if (!customCursor) return;

  // ocultamos el cursor nativo solo en desktop
  if (window.matchMedia("(pointer: fine)").matches) {
    document.body.style.cursor = "none";
  }

  document.addEventListener("mousemove", (e) => {
    customCursor.style.top = e.clientY + "px";
    customCursor.style.left = e.clientX + "px";
  });

  // rotación al pasar sobre vinilos
  document.querySelectorAll(".vinyl-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const img = customCursor.querySelector("img");
      if (!img) return;
      img.style.transform = "rotate(360deg)";
      img.style.transition = "transform 0.6s ease";
    });

    card.addEventListener("mouseleave", () => {
      const img = customCursor.querySelector("img");
      if (!img) return;
      img.style.transform = "rotate(0deg)";
    });
  });
}
