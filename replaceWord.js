const fs = require('fs');
const readline = require('readline');

const myOldAppName = 'my-new-ts-app';
const myNewAppName = process.argv[2];

if (myNewAppName === null || myNewAppName === undefined || myNewAppName.length === 0) {
  throw new Error("New app name cannot be empty");
} else if (myNewAppName === 'cra-forge-ts') {
  throw new Error("New app name cannot be 'cra-forge-ts'");
}

const editFile = (filePath) => {
  console.log("Editing file : " + filePath);
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  const newLines = [];
  const regex = new RegExp("\\b" + myOldAppName + "\\b", 'g');

  rl.on('line', line => {
    const newLine = line.replace(regex, myNewAppName);
    newLines.push(newLine);
  });

  rl.on('close', () => {
    const newContent = newLines.join('\n');
    fs.writeFileSync(filePath, newContent);
    console.log(" > Successfully edited file : " + filePath + " !");
  });
}

editFile('package.json');
editFile('public/index.html');
editFile('public/manifest.json');
editFile('src/i18next/index.ts');
