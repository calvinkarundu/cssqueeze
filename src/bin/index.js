#!/usr/bin/env node

import 'babel-polyfill';

import fs from 'fs';
import path from 'path';
import cssqueeze from '../index';
import program from 'commander';

const packageConfig = fs.readFileSync(
  path.join(path.dirname(
    fs.realpathSync(process.argv[1])), '../../package.json'
  )
);
const buildVersion = JSON.parse(packageConfig).version;

program
  .version(buildVersion, '-v, --version')
  .option('-s, --source [path]', 'source file path.')
  .option('-d, --destination [path]', 'destination file path.')
  .option('-c, --config [path]', 'config file path.');

program.on('--help', () => {
  console.log('\n  Examples:\n');
  console.log('    %> cssqueeze -s ../sourceFilePath -d ../destinationFilePath');
  console.log('    %> cssqueeze -c ../configFilePath');
  console.log('');
  process.exit();
});

program.parse(process.argv);

const isEmptyArgs = () => {
  const fromStdin = !process.env.__DIRECT__ && !process.stdin.isTTY;
  const useBasicConfig = program.source !== undefined && program.destination !== undefined;
  const useCustomConfig = program.config !== undefined;

  if (useBasicConfig !== true && useCustomConfig !== true && !fromStdin) return true;

  return false;
};

const squeezalicious = async ({ config }) => {
  try {
    const result = await cssqueeze({ config });
    if (result) console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const getConfig = () => {
  const useBasicConfig = program.source !== undefined && program.destination !== undefined;
  const useCustomConfig = program.config !== undefined;

  let config;

  if (useBasicConfig) {
    config = {
      source: program.source,
      destination: program.destination,
    };
  }

  if (useCustomConfig) {
    const customConfig = fs.readFileSync(program.config);
    const customConfigObject = JSON.parse(customConfig);

    config = customConfigObject;
  }

  return config;
};

// If sensible data passed in get the config and off we go!
// If not, print help and exit
if (!isEmptyArgs()) {
  const config = getConfig();
  squeezalicious({ config });
} else {
  program.outputHelp();
}
