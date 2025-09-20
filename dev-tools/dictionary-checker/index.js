const fs = require("fs");
const path = require("path");

// Paths always relative to this script's folder
const wordsPath = path.join(__dirname, "words.json");
const missingPath = path.join(__dirname, "missing.json");

// Load words.json
const words = JSON.parse(fs.readFileSync(wordsPath, "utf-8"));

async function checkWords() {
    const notFoundByCategory = {};
    let totalFound = 0;
    let totalMissing = 0;

    for (const [category, wordList] of Object.entries(words)) {
        let foundCount = 0;
        let missingCount = 0;

        console.log(`\n=== Checking category: ${category} ===`);

        for (const word of wordList) {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (!res.ok) {
                    console.log(`Not found: ${word}`);
                    if (!notFoundByCategory[category]) notFoundByCategory[category] = [];
                    notFoundByCategory[category].push(word);
                    missingCount++;
                } else {
                    console.log(`Found: ${word}`);
                    foundCount++;
                }

                // Throttle requests (2 seconds between each)
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error(`Error with: ${word}`, err);
                if (!notFoundByCategory[category]) notFoundByCategory[category] = [];
                notFoundByCategory[category].push(word);
                missingCount++;
            }
        }

        console.log(`Category summary: Found ${foundCount}, Missing ${missingCount}`);
        totalFound += foundCount;
        totalMissing += missingCount;
    }

    // Save missing words grouped by category
    fs.writeFileSync(missingPath, JSON.stringify(notFoundByCategory, null, 2));

    // Print final totals
    console.log("\n=== OVERALL SUMMARY ===");
    console.log(`Total Found: ${totalFound}`);
    console.log(`Total Missing: ${totalMissing}`);
    console.log("\nFull list of missing words saved to missing.json");
}

checkWords();
