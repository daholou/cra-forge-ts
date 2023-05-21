const fs = require('fs');
const path = require('path');

const sourceFilePath = '.github.sample/workflows/.github-pages.yml';
const destinationFilePath = '.github/workflows/.github-pages.yml';
const destinationDir = path.dirname(destinationFilePath);

console.log(`Copying file ${sourceFilePath} to ${destinationFilePath}`);

if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
}

try {
    fs.copyFileSync(sourceFilePath, destinationFilePath);
    console.log(` > Successfully copied ${sourceFilePath} to ${destinationFilePath}`);
} catch (err) {
    const msg = `Something went wrong during the copy of ${sourceFilePath}`;
    console.error(msg, err);
    throw new Error(msg);
}
