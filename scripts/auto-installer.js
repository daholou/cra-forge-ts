const shell = require('shelljs');
const { replaceWord } = require('./replaceWord');
const { log, promptWithEscape, getCurrentWorkingDirName } = require('./utils');
const { BASE_APP_NAME } = require('./constants');
const { Octokit } = require('octokit');

const CURRENT_WORKING_DIR_NAME = getCurrentWorkingDirName();

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

/**
 * Checks whether a project name is valid.
 *
 * @param name - the proposed name
 * @param repoNames - names of the repositories owned by the current user
 * @returns true iff the proposed name is valid
 */
const validateAppName = (name = '', repoNames = []) => {
  if (name.length === 0) {
    name = CURRENT_WORKING_DIR_NAME;
  }
  if (name === null || name === undefined || name.length === 0) {
    log.error(`Invalid name "${name}"`);
    log.error('The app name cannot be empty.');
    return false;
  } else if (!/^[a-zA-Z0-9_.-]*$/.test(name)) {
    log.error(`Invalid name "${name}"`);
    log.error('The app name can contain only letters, digits, \'_\', \'.\' and \'-\'.');
    return false;
  } else if (name === BASE_APP_NAME) {
    log.error(`Invalid name "${name}"`);
    log.error(`The app name cannot be ${name}.`);
    return false;
  } else if (repoNames.includes(name)) {
    log.error(`Invalid name "${name}"`);
    log.error('A GitHub repository with that name already exists.');
    return false;
  }
  return true;
};

/**
 * Lets the user choose a valid project name
 *
 * @param repoNames - names of the repositories owned by the current user
 * @returns the chosen project name
 */
const inputAppName = (repoNames = []) => {
  let appName;
  let isAppNameValid = false;
  while (!isAppNameValid) {
    appName = promptWithEscape(`Enter your app name, or leave empty to use ${CURRENT_WORKING_DIR_NAME}`);
    isAppNameValid = validateAppName(appName, repoNames);
  }
  return appName;
};

/**
 * Checks whether the scope of a GitHub personal access token is valid.
 *
 * @param xOAuthScopes - the token scope
 * @returns true iff the token scope is valid
 */
const isValidScopeToken = (xOAuthScopes = '') => {
  const scopes = xOAuthScopes.split(', ');
  return scopes.includes('repo');
};

/**
 * Checks whether a GitHub personal access token is valid.
 *
 * @param token - the proposed token
 * @returns true iff the proposed token is valid
 */
const validatePersonalAccessToken = async (token) => {
  const octokit = new Octokit({ auth: token });
  try {
    const userData = await octokit.request('/user');
    log.info(`Welcome ${userData.data.name} !`);
    const repoData = await octokit.request('/user/repos');
    if (!isValidScopeToken(repoData.headers['x-oauth-scopes'])) {
      log.error(`Invalid token ${token}`);
      log.error('The token scope must be at least \'repo\' .');
      return { isValid: false, repoNames: [] };
    }
    const myRepoNames = repoData.data
      .filter(repo => repo.owner.login === userData.data.login)
      .map(repo => repo.name);
    return { isValid: true, repoNames: myRepoNames };
  } catch (err) {
    log.error(err);
    log.error(`Error ${err.status} - ${err.data.message}`);
    return { isValid: false, repoNames: [] };
  }
};

/**
 * Authenticates the current user with a valid personal access token.
 *
 * @return { token, tokenRepoNames } - the personal access token, and the list
 *  of each repo name owned by the current user.
 */
const inputPersonalAccessToken = async () => {
  let token;
  let isTokenValid = false;
  let tokenRepoNames = [];
  while (!isTokenValid) {
    token = promptWithEscape('Enter your GitHub Personal Access Token');
    const { isValid, repoNames } = await validatePersonalAccessToken(token);
    isTokenValid = isValid;
    tokenRepoNames = repoNames;
  }
  return { token, tokenRepoNames };
};


// edit project files with a new appName
const editProjectFilesWithAppName = (appName) => {
  replaceWord('package.json', BASE_APP_NAME, appName);
  replaceWord('public/index.html', BASE_APP_NAME, appName);
  replaceWord('public/manifest.json', BASE_APP_NAME, appName);
  replaceWord('src/i18next/index.ts', BASE_APP_NAME, appName);
};

// creates a GitHub repository
const createGitRepository = async (token, appName) => {
  const octokit = new Octokit({ auth: token });
  await octokit.request('POST /user/repos', {
    name: appName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
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
  shell.exec('git add ./.github/workflows/.github-pages.yml');
  shell.exec('git commit -am "Setting up GitHub Actions..."');
  shell.exec('git push');
  shell.exec('git checkout -b develop');
  shell.exec('git push --set-upstream origin develop');
};

const autoInstall = async () => {
  validateSoftware();
  deleteGitFolder();
  const { token, tokenRepoNames } = await inputPersonalAccessToken();
  const appName = inputAppName(tokenRepoNames);
  await createGitRepository(token, appName);
  editProjectFilesWithAppName(appName);
  initGitRepository(appName);
  deployGitHubPages();
  initGitHubActions();
};

autoInstall()
  .then(() => {
    log.info('Installation successful !');
    log.info('Don\'t forget to go to https://github.com/ and make `develop` the default branch.');
  })
  .catch((err) => {
    log.error(err);
    log.error('Something went wrong during the installation...');
    // todo - rollback the project if things go south (with git Octokit ?)
  });
