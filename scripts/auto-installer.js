const shell = require('shelljs');
const { replaceWord } = require("./replaceWord");
const { BASE_APP_NAME } = require("./constants");
const { Octokit } = require("octokit");
const prompt = require('prompt-sync')();

// check if git is installed
const validateSoftware = () => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
};

// rm -rf .git
const deleteGitFolder = () => {
  shell.rm('-rf', '.git');
};

// checks that the project name is valid
const validateAppName = (name) => {
  if (name === null || name === undefined || name.length === 0) {
    console.error('New app name cannot be empty');
    return false;
  } else if (name === BASE_APP_NAME) {
    console.error(`New app name cannot be [${name}]`);
    return false;
  }
  return true;
}

// lets the user choose a valid project name
const inputAppName = () => {
  let appName;
  let isAppNameValid = false;
  while (!isAppNameValid) {
    appName = prompt('Enter your app name : ');
    isAppNameValid = validateAppName(appName);
  }
  return appName;
}

// edit project files with a new appName
const editProjectFilesWithAppName = (appName) => {
  replaceWord('package.json', BASE_APP_NAME, appName);
  replaceWord('public/index.html', BASE_APP_NAME, appName);
  replaceWord('public/manifest.json', BASE_APP_NAME, appName);
  replaceWord('src/i18next/index.ts', BASE_APP_NAME, appName);
};

// creates a GitHub repository
const createGitRepository = async (appName) => {
  const personalAccessToken = prompt('Enter your GitHub Personal Access Token : ');
  const octokit = new Octokit({auth: personalAccessToken});
  await octokit.request('POST /user/repos', {
    name: appName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return personalAccessToken;
};

// git init
// git add .
// git commit -m "Forging project..."
// git init
// git branch -M main
// git remote add origin https://github.com/daholou/${appName}.git
// git push -u origin main
const initGitRepository = (appName) => {
  shell.exec('git init');
  shell.exec('git add .');
  shell.exec('git commit -m "Forging project..."');
  shell.exec('git branch -M main');
  shell.exec(`git remote add origin https://github.com/daholou/${appName}.git`);
  shell.exec('git push -u origin main');
};

// yarn deploy
const deployGitHubPages = () => {
  shell.exec('yarn run deploy');
};

// mkdir ./.github/workflows
// mv github-pages.sample.yml ./.github/workflows/.github-pages.yml
// git commit -am "Setting up GitHub Actions..."
// git push
// git checkout -b develop
// git push --set-upstream origin develop
const initGitHubActions = () => {
  shell.mkdir('-p', './.github/workflows');
  shell.mv('github-pages.sample.yml', './.github/workflows/.github-pages.yml');
  shell.exec('git commit -am "Setting up GitHub Actions..."');
  shell.exec('git push');
  shell.exec('git checkout -b develop');
  shell.exec('git push --set-upstream origin develop');
};

const conclude = () => {
  shell.echo('Now go to github.com and make `develop` the default branch');
}

//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
const autoInstall = async () => {
  try {
    validateSoftware();
    deleteGitFolder();
    const appName = inputAppName();
    editProjectFilesWithAppName(appName);
    await createGitRepository(appName);
    initGitRepository(appName);
    deployGitHubPages();
    initGitHubActions();
    conclude();
  } catch (err) {
    const msg = 'Oops! Something went wrong during the installation...';
    console.error(msg, err);
    throw new Error(msg);
  }
}

autoInstall();

// todo - catch createGitRepository() errors
//  on name input and GH-token validity

// todo - rollback the project if things go south (with git Octokit ?)

// todo - user friendly prompt to let the user exit (x, Ctrl+C, ...)
