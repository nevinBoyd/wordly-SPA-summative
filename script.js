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
  const { word, phonetics, meanings } = wordData;

  //GRAB PHOENETIC SPELLING
  const phoneticText = phonetics.find((p) => p.text)?.text || "";

  const firstAudio = (phonetics || []).find((p) => p.audio)?.audio;

  let audioBtn = "";
  if (firstAudio) {
    audioBtn = `<button class="audio-btn" onclick="playAudio('${firstAudio}')">🔉 <span>Listen</span></button>`;
  }

  let html = `
  <div class="word-entry">
    <div class="word-title">
      <span class="label">WORD:</span> 
      <span class="value">${word}</span>
      <div class="word-right">${audioBtn ? `${audioBtn}` : ""}</div>
    </div>
      <div class="word-right">
        ${audioBtn ? `${audioBtn}` : ""}
      </div>
    </div>
    ${phoneticText ? `<div class="phonetics"><span class="label">PHONETICS:</span> <span class="value">${phoneticText}</span></div>` : ""}
  `;

  meanings.forEach((meaning) => {
    const firstDef = meaning.definitions[0];

    html += `<div class="meaning-group">`;

    if (meaning.partOfSpeech) {
      html += `
        <div class="definition">
          <span class="label">TYPE:</span>
          <span class="value">${meaning.partOfSpeech}</span>
        </div>
      `;
    }

    if (firstDef.definition) {
      html += `
        <div class="definition">
          <span class="label">DEFINE:</span>
          <span class="value">${firstDef.definition}</span>
        </div>
      `;
    }

    if (firstDef.example && firstDef.example !== "undefined") {
      html += `
        <div class="definition">
          <span class="label">EXAMPLE:</span>
          <span class="value">${firstDef.example}</span>
        </div>
      `;
    }

    html += `</div>`;

  });

  html += `</div>`;
  resultsDiv.innerHTML = html;
}

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}
