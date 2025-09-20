const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (!word) return;

  resultsDiv.innerHTML = "<p>Loading...</p>";
  await fetchWord(word);
});

async function fetchWord(word) {
  try {
    const res = await fetch(API_URL + word);
    if (!res.ok) throw new Error("Word not found!");
    const data = await res.json();

    console.log(`FOUND: ${word}`)

    displayResults(data[0]);
  } catch (error) {

    console.log(`NOT FOUND: ${word}`);
    const safeword = escapeHTML(word)
    resultsDiv.innerHTML = `<div style="color:red; text-align:center;">
        <p>Sorry the word "<strong>${safeword}</strong>" is not located in the Free Dictionary API.</p>
                <p>Try a different word</p>
            </div>
            `;
  }
}

function displayResults(wordData) {
  const { word, phonetics, origin, meanings } = wordData;
  //GRAB PHOENETIC SPELLING
  const phoneticText = phonetics
    .map(p => p.text)
    .filter(Boolean)
    .join(",");

  let audioBtn = "";
  const audioSrc = phonetics.find(p => p.audio)?.audio;
  if (audioSrc) {
    audioBtn = `
      <button class="audio-btn" onclick="playAudio('${audioSrc}')">🔉 Audio</button>
    `;
  }

  let html = `
    <div class="word-title"><strong>${word}</strong> ${audioBtn}</div>
    ${phoneticText ? `<div class="phonetics">[${phoneticText}]</div>` : ""}
    ${origin ? `<div class="origin"><em>Origin:</em> ${origin}</div>` : ""}
  `;

  meanings.forEach((meaning) => {
    html += `
      <div class="definition">
        <strong>${meaning.partOfSpeech}</strong>:
        <ul>
          ${meaning.definitions
        .map(
          def => `
                <li>
                  ${def.definition}
                  ${def.example ? `<br><em>${def.example}</em>` : ""}
                </li>`
        )
        .join("")}
        </ul>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}
