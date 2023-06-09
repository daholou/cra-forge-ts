const shell = require('shelljs');
const path = require('node:path');
const { CRAForgeTsError } = require('./CRAForgeTsError');
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
  error: (...data) => console.error('*** ERROR - ', ...data)
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
    throw new CRAForgeTsError('Installation was aborted by the user.');
  }
  return data;
};

/**
 * Checks that all tools are installed
 *
 * @param commands tools needed
 */
const validateSoftware = (commands = []) => {
  commands.forEach(command => {
    if (!shell.which(command)) {
      throw new CRAForgeTsError(`Sorry, this script requires ${command}.`);
    }
  });
};

module.exports = {
  stripTrailingSeparator,
  getCurrentWorkingDirName,
  promptWithEscape,
  log,
  validateSoftware
};