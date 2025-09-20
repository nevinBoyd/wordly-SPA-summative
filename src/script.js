const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

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
        displayResults(data[0]);
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayResults(wordData) {
    const { word, phonetics, meanings } = wordData;

    let audioBtn = "";
    if (phonetics[0] && phonetics[0].audio) {
        audioBtn = `
      <button class="audio-btn" onclick="playAudio('${phonetics[0].audio}')">🔊 Audio</button>
    `;
    }

    let html = `
    <div class="word-title">${word} ${audioBtn}</div>
  `;
    meanings.forEach((meaning) => {
        html += `
      <div class="definition">
        <strong>${meaning.partOfSpeech}</strong>: 
        ${meaning.definitions[0].definition}
        <br><em>${meaning.definitions[0].example || ""}</em>
      </div>
    `;
    });

    resultsDiv.innerHTML = html;
}
function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
}
