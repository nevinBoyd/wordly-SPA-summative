# Wordly Dictionary – Dev Tool Instructions

This script checks a list of words against the Free Dictionary API and saves all words not found into missing.json, organized by category.

---

## File Setup
Make sure your project has this structure inside the dev-tools folder:

dev-tools
└── dictionary-checker
├── Dev_Tool_Instructions.txt
├── words.json
├── missing.json
└── index.js


---

## Requirements
- Node.js installed (v18+ recommended, supports native fetch)  
- Internet connection (script calls the Free Dictionary API)  

---

## How to Run
1. Open a terminal and navigate to the dev-tools folder:
   ```bash
   cd dev-tools
  node index.js

  What It Does

Reads words.json (your categories of words).

Checks each word against the Free Dictionary API.

Logs results in the terminal:

Found: word

Not found: word

Waits 2 seconds per request (to avoid API rate limits).

Saves all missing words to missing.json like this:

{
  "proper_nouns": ["Egypt", "London"],
  "slang": ["fam", "sus"],
  "edge_cases": ["zyxwvut", "gibberishword"]
}


## Console Output Example
=== Checking category: common ===
Found: book
Found: run
Not found: dinosaur
Category summary: Found 21, Missing 1

=== OVERALL SUMMARY ===
Total Found: 175
Total Missing: 25

Full list of missing words saved to missing.json


## Next Steps After Running

Open missing.json to review the unfound words.

Use these for special-case handling in your main app (e.g., custom messages, manual definitions, exclusions).
