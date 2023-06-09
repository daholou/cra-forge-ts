const shell = require('shelljs');
const path = require('node:path');
const prompt = require('prompt-sync')();

/**
 * Strips any trailing path separator / or \ from a string
 *
 * @param str a string (url or path)
 * @returns the same string but without any trailing path separator
 */
const stripTrailingSeparator = (str) => {
  return str.endsWith(path.sep) ? str.slice(0, -path.sep.length) : str;
};

/**
 * Gets the name of the current working dir (last url segment)
 */
const getCurrentWorkingDirName = () => {
  const currentWorkingDir = shell.pwd();
  const trimmedCWD = stripTrailingSeparator(currentWorkingDir.stdout);
  const lastSeparatorIndex = trimmedCWD.lastIndexOf(path.sep);
  return trimmedCWD.substring(lastSeparatorIndex + path.sep.length);
};

const log = {
  info: (...data) => console.log('$', ...data),
  error: (...data) => console.error('$', ...data)
};

/**
 * A prompt with decoration and an escape key
 *
 * @param text text displayed in prompt
 * @param escapeKey throws an error when the prompt is equal to this value
 * @returns the prompt result
 */
const promptWithEscape = (text, escapeKey = 'q') => {
  const data = prompt(`$ ${text} (Press '${escapeKey}' to quit) : `);
  if (data === escapeKey) {
    log.info('Installation aborted by user.');
    shell.exit(1);
  }
  return data;
};

module.exports = {
  stripTrailingSeparator,
  getCurrentWorkingDirName,
  promptWithEscape,
  log
};