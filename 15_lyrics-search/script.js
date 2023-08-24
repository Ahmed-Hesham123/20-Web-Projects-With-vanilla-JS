const form = document.getElementById("form"),
  search = document.getElementById("search"),
  result = document.getElementById("result"),
  more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) =>
            `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
        `
        )
        .join("")}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next songs
async function getMoreSongs(url) {
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  try {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics;

    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    `;

    more.innerHTML = "";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Event Listeners
form.addEventListener("submit", (eo) => {
  eo.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (eo) => {
  const clickedEl = eo.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
