const fs = require('fs');

// *********************************************************** //
// *********************     VARIABLES     ******************* //
// *********************************************************** //

const FILENAME = 'fifty_shades_of_grey.txt'; // name of textfile at root (alongside this index.js file).
const CARE_ABOUT_MORE_THAN_OCCURRENCES = 0; // only show words that occur more than X times in output, 0 to show all.
const WORDS_TO_IGNORE = [
    '',
    'the',
    'and',
    'is',
    'that',
    'to',
    'of'
]; // words that you want excluded from counts (lowercase!)

// *********************************************************** //
// *********************     FUNCTIONS     ******************* //
// *********************************************************** //

const getWordsFromLines = lines => {
    let words = [];
    lines.forEach(line => {
        var wordsInLine = line.split(' ');
        words = [...words, ...wordsInLine.map(word => word.trim().toLowerCase())]
    });
    return words;
};

const readWordsFromTextFile = fileName => {
    const lines = fs.readFileSync(`./${fileName}`,  'utf-8').split('\n');
    return getWordsFromLines(lines);
}

const cleanWords = words => words.map(word => {
    word = word.replace('”', '');
    word = word.replace('“', '');
    word = word.replace('"', '');
    word = word.replace(',', '');
    word = word.replace('.', '');
    word = word.replace(';', '');
    word = word.replace('?', '');
    word = word.replace('!', '');
    word = word.trim();
    return word;
});

const filterWords = words => words.filter(word => !WORDS_TO_IGNORE.includes(word.toLowerCase()));

const countOccurencesOfWords = words => {
    let occurences = {};
    words.forEach(word => {
        if (!occurences[word]) {
            occurences[word] = 1;
        } else {
            occurences[word] = occurences[word] + 1;
        }
    });

    return occurences;
};

const sortOccurencesByCountDesc = occurences => occurences.sort((a, b) => (a[1] < b[1]) ? 1 : -1);

// *********************************************************** //
// **********************     PROGRAM     ******************** //
// *********************************************************** //
const words = readWordsFromTextFile(FILENAME);
console.log(`${words.length} words parsed`);

const cleanedWords = cleanWords(words);
const filteredWords = filterWords(cleanedWords);
console.log(`${words.length - filteredWords.length} words removed (ignored)`);

var occurences = Object.entries(countOccurencesOfWords(filteredWords));
const sortedOccurences = sortOccurencesByCountDesc(occurences);

sortedOccurences.filter(elem => elem[1] > CARE_ABOUT_MORE_THAN_OCCURRENCES).forEach(elem => console.log(`${elem[1]} - ${elem[0]}`))