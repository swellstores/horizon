import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const STORE_ID = process.env.SWELL_STORE_ID;
const STOREFRONT_ID = process.env.SWELL_STOREFRONT_ID;
const API_BASE_URL = process.env.SWELL_API_BASE_URL ?? '';
const SECRET_KEY = process.env.SWELL_SECRET_KEY;

let cli_envs = '';

if (!STORE_ID) {
  throw new Error('Missing SWELL_STORE_ID');
}

if (!STOREFRONT_ID) {
  throw new Error('Missing SWELL_STOREFRONT_ID');
}

if (!SECRET_KEY) {
  throw new Error('Missing SWELL_SECRET_KEY');
}

if (API_BASE_URL) {
  cli_envs = `API_BASE_URL=${API_BASE_URL} `;
}

function executeCommand(command) {
  exec(command.join(' '), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(stdout || stderr);
  });
}

executeCommand([
  `${cli_envs}swell storefronts toggle-editor`,
  `--id ${STOREFRONT_ID}`,
  '--theme-id horizon',
  '--enable true',
  `--secret-key ${SECRET_KEY}`,
  `--store ${STORE_ID}`,
]);

executeCommand([
  `${cli_envs}swell storefronts push`,
  `--id ${STOREFRONT_ID}`,
  '-t editor',
  '-f ./config/editor.json',
  `--secret-key ${SECRET_KEY}`,
  `--store ${STORE_ID}`,
]);

executeCommand([
  `${cli_envs}swell storefronts push`,
  `--id ${STOREFRONT_ID}`,
  '-t settings',
  '-f ./config/defaults.json',
  `--secret-key ${SECRET_KEY}`,
  `--store ${STORE_ID}`,
]);

fs.readdirSync('./config/content').forEach((file) => {
  executeCommand([
    `${cli_envs}swell model push -c`,
    `-f ./config/content/${file}`,
    `--secret-key ${SECRET_KEY}`,
    `--store ${STORE_ID}`,
  ]);
});
