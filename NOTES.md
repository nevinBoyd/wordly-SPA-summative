# Wordly SPA Development Notes

This document summarizes the design decisions, key features, styling, developer tools, issues, and future improvements for the Wordly Dictionary SPA project.

---

## Project Overview
A Single Page Application (SPA) built with HTML, CSS, and JavaScript that fetches and displays dictionary data from the Free Dictionary API.

Core Features:
- Search bar with input + button
- Fetch word data dynamically (word, part of speech, definition, example usage)
- Play pronunciation audio (if available)
- Error handling for missing words
- Dark theme styling with highlighted accents

---

## Project Structure
- index.html → Entry point
- style.css → Styling rules
- script.js → App logic (fetch/display word data, audio handling)
- dev-tools/ (developer-only utilities)
  - index.js → Checks words against API
  - words.json → Word categories
  - missing.json → Words not found in API

---

## Key Features
### 1. Word Search
- Fetches data from Free Dictionary API.
- Displays results in styled cards.
- If not found → user-friendly red error message:  
  `Sorry the word "WORD" is not located in the Free Dictionary API. Try a different word.`

### 2. Error Handling
- Prevents crashes on API errors.
- Console logs:  
  - `FOUND: word`  
  - `NOT FOUND: word`
- Explains why proper nouns (e.g., Egypt) fail.

### 3. Word Card Layout
Each entry shows:
- WORD (inline with audio button)
- PHONETICS (if available)
- TYPE (part of speech)
- DEFINE (definition)
- EXAMPLE (if available)
- ORIGIN (if provided)

### 4. Audio Button
 Plays first available phonetic audio:
  ```js
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
