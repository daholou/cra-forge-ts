const fs = require('fs');
const readline = require('readline');
const { log } = require('./utils');

const replaceWord = async (filePath, wordToReplace, someOtherWord) => {
  log.info(`Editing file ${filePath} ...`);
  const readlineInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  const newLines = [];
  const regex = new RegExp('\\b' + wordToReplace + '\\b', 'g');

  for await (const line of readlineInterface) {
    const newLine = line.replace(regex, someOtherWord);
    newLines.push(newLine);
  }

  const newContent = newLines.join('\n');
  fs.writeFileSync(filePath, newContent);
  log.info(`Successfully edited file ${filePath} !`);
};

module.exports = {
  replaceWord
};
