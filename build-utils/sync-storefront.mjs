import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const STOREFRONT_ID = process.env.SWELL_STOREFRONT_ID;
const ADMIN_API_BASE_URL = process.env.SWELL_ADMIN_API_BASE_URL ?? '';

let cli_envs = '';

if (!STOREFRONT_ID) {
  throw new Error('Missing SWELL_STOREFRONT_ID');
}

if (ADMIN_API_BASE_URL) {
  cli_envs = `ADMIN_API_BASE_URL=${ADMIN_API_BASE_URL} `;
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
  `${cli_envs}swell storefronts push`,
  `--id ${STOREFRONT_ID}`,
  '-i \'{"editor": true}\'',
]);

executeCommand([
  `${cli_envs}swell storefronts push-configs`,
  `--id ${STOREFRONT_ID}`,
  '-t editor',
  '-f ./config/editor.json',
]);

executeCommand([
  `${cli_envs}swell storefronts push-configs`,
  `--id ${STOREFRONT_ID}`,
  '-t settings',
  '-f ./config/defaults.json',
]);

fs.readdirSync('./config/content').forEach((file) => {
  executeCommand([
    `${cli_envs}swell model push`,
    `-f ./config/content/${file}`,
  ]);
});
