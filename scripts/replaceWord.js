const fs = require('fs');
const readline = require('readline');

export const replaceWord = (filePath, wordToReplace, someOtherWord) => {
  console.log(` ___ Editing file : [${filePath}]`);
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  const newLines = [];
  const regex = new RegExp("\\b" + wordToReplace + "\\b", 'g');

  rl.on('line', line => {
    const newLine = line.replace(regex, someOtherWord);
    newLines.push(newLine);
  });

  rl.on('close', () => {
    const newContent = newLines.join('\n');
    fs.writeFileSync(filePath, newContent);
    console.log(` === Successfully edited file : [${filePath}]`);
  });
}
