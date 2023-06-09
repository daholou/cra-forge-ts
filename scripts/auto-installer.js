const shell = require('shelljs');
const { replaceWord } = require('./replaceWord');
const { validateSoftware, log, promptWithEscape, getCurrentWorkingDirName } = require('./utils');
const { BASE_APP_NAME } = require('./constants');
const { Octokit } = require('octokit');
const { CRAForgeTsError } = require('./CRAForgeTsError');

const CURRENT_WORKING_DIR_NAME = getCurrentWorkingDirName();

// rm -rf .git
const deleteGitFolder = () => {
  shell.rm('-rf', '.git');
};

/**
 * Checks whether a project name is valid.
 *
 * @param name - the proposed name
 * @param repoNames - names of the repositories owned by the current user
 * @returns true iff the proposed name is valid, and the chosen name
 */
const validateAppName = (name = '', repoNames = []) => {
  if (name.length === 0) {
    name = CURRENT_WORKING_DIR_NAME;
  }
  if (name === null || name === undefined || name.length === 0) {
    log.error(`Invalid name "${name}"`);
    log.error('The app name cannot be empty.');
    return { isValid: false, actualName: name };
  } else if (!/^[a-zA-Z0-9_.-]*$/.test(name)) {
    log.error(`Invalid name "${name}"`);
    log.error('The app name can contain only letters, digits, \'_\', \'.\' and \'-\'.');
    return { isValid: false, actualName: name };
  } else if (name === BASE_APP_NAME) {
    log.error(`Invalid name "${name}"`);
    log.error(`The app name cannot be ${name}.`);
    return { isValid: false, actualName: name };
  } else if (repoNames.includes(name)) {
    log.error(`Invalid name "${name}"`);
    log.error('A GitHub repository with that name already exists.');
    return { isValid: false, actualName: name };
  }
  return { isValid: true, actualName: name };
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
    const { isValid, actualName } = validateAppName(appName, repoNames);
    isAppNameValid = isValid;
    appName = actualName;
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
    log.error(`Error ${err.status} - ${err.response.data.message}`);
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

/**
 * Edits some project files with a new appName
 *
 * @param appName - the new app name
 */
const editProjectFilesWithAppName = (appName) => {
  replaceWord('package.json', BASE_APP_NAME, appName);
  replaceWord('public/index.html', BASE_APP_NAME, appName);
  replaceWord('public/manifest.json', BASE_APP_NAME, appName);
  replaceWord('src/i18next/index.ts', BASE_APP_NAME, appName);
};

/**
 * Creates a new GitHub repository
 *
 * @param token - a valid personal access token
 * @param appName - the new app name (also repository name)
 */
const createGitRepository = async (token, appName) => {
  const octokit = new Octokit({ auth: token });
  await octokit.request('POST /user/repos', {
    name: appName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
};

/**
 * Runs the following commands :
 * <p>git init</p>
 * <p>git add .</p>
 * <p>git commit -m "Forging project..."</p>
 * <p>git branch -M main</p>
 * <p>git remote add origin https://github.com/daholou/${appName}.git</p>
 * <p>git push -u origin main</p>
 *
 * @param appName - the new app name
 */
const initGitRepository = (appName) => {
  shell.exec('git init');
  shell.exec('git add .');
  shell.exec('git commit -m "Forging project..."');
  shell.exec('git branch -M main');
  shell.exec(`git remote add origin https://github.com/daholou/${appName}.git`);
  shell.exec('git push -u origin main');
};


/**
 * Runs the following commands :
 * <p>yarn run deploy</p>
 */
const deployGitHubPages = () => {
  shell.exec('yarn run deploy');
};

/**
 * Runs the following commands :
 * <p>mkdir ./.github/workflows</p>
 * <p>mv github-pages.sample.yml ./.github/workflows/.github-pages.yml</p>
 * <p>git add ./.github/workflows/.github-pages.yml</p>
 * <p>git commit -am "Setting up GitHub Actions..."</p>
 * <p>git push</p>
 * <p>git checkout -b develop</p>
 * <p>git push --set-upstream origin develop</p>
 */
const initGitHubActions = () => {
  shell.mkdir('-p', './.github/workflows');
  shell.mv('github-pages.sample.yml', './.github/workflows/.github-pages.yml');
  shell.exec('git add ./.github/workflows/.github-pages.yml');
  shell.exec('git commit -am "Setting up GitHub Actions..."');
  shell.exec('git push');
  shell.exec('git checkout -b develop');
  shell.exec('git push --set-upstream origin develop');
};

/**
 * Runs all steps of the installation process
 *
 * @returns {Promise<void>}
 */
const autoInstall = async () => {
  validateSoftware([ 'git' ]);
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
    if (err.name === CRAForgeTsError.name) {
      log.error(err.message);
      log.error('Something went wrong during the installation...');
    } else {
      log.error('An unexpected error occurred !', err);
      throw err;
    }
    // todo - rollback the project if things go wrong ? delete repo ? reset ?
  });
