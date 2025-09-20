# Wordly SPA Summative Lab

# A simple Single Page Application (SPA) dictionary app built with HTML, CSS, and JavaScript.
# Uses the Free Dictionary API (https://dictionaryapi.dev/) to fetch word definitions, pronunciation, and audio.

#  Wordly Dictionary (SPA)

# A Single Page Application (SPA) dictionary built with **HTML, CSS, and   JavaScript**, using the **Free Dictionary API**.  
# Users can search for words, view definitions, parts of speech, and phonetics, and listen to pronunciation audio.



##  Features
# Word search with live API fetch  
# Displays **definitions, phonetics, part of speech, and examples**  
# **Audio playback** button for pronunciation  
# Handles errors gracefully (custom messages for missing words)  
# **Dark theme** with styled highlights for readability  
# Developer tools for validating word lists against the API  



##  Project Structure

# Wordly-SPA/
# │
# ├── index.html 
# ├── style.css 
# ├── script.js 
# │
# ├── dev-tools
# │ │   └── Dev_Tool_Instructions.txt
# │ │
# │ └──dictionary-checker
# │     ├── words.json
# │     ├── missing.json
# │     └── index.js
# │
# └── README.md 

## Installation and Usage

# 1. Clone or download the repository.  
# 2. Open `index.html` in a browser.  
# 3. Type a word into the search bar and click Search.  
# 4. If available, click Listen to hear pronunciation.  

## Developer Tools
# Inside `dev-tools/`, run the included script to check a word list against the API:  
# ```bash
# cd dev-tools
# node index.js (used local node v22.19.0)

# Missing words are saved to missing.json by category.

# Full instructions: dev-tools/Dev_Tool_Instructions.txt

# See developement notes: /Wordly SPA Summative Lab/ NOTES.md