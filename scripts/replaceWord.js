const fs = require('fs');
const readline = require('readline');
const { log } = require('./utils');

/**
 * Reads a file and replaces all occurrences of a word with another word.
 * If wordToReplace==="car", we look for the RegExp /\bcar\b/g
 * If wordToReplace is a RegExp, we look for that instead
 *
 * @param filePath - path to target file
 * @param wordToReplace - the word to replace, or a RegExp
 * @param someOtherWord - the word to replace it with
 * @return {Promise<boolean>} - true iff a word was replaced in the file
 */
const replaceWord = async (filePath, wordToReplace, someOtherWord) => {
  log.info(`Editing file ${filePath} ...`);
  const readlineInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  const newLines = [];
  const regex = (wordToReplace instanceof RegExp)
    ? wordToReplace
    : new RegExp('\\b' + wordToReplace + '\\b', 'g');
  let hasReplacedWord = false;

  for await (const line of readlineInterface) {
    const newLine = line.replace(regex, someOtherWord);
    newLines.push(newLine);
    if (!hasReplacedWord) {
      hasReplacedWord = regex.test(line);
    }
  }

  const newContent = newLines.join('\n');
  fs.writeFileSync(filePath, newContent);

  if (hasReplacedWord) {
    log.info(`Successfully edited file ${filePath} !`);
  } else {
    log.info(`Nothing was changed in file ${filePath}`);
  }
  return hasReplacedWord;
};

module.exports = {
  replaceWord
};
