import { readFileSync } from 'node:fs';
import './env.config.js';

const packageJson = JSON.parse(
    readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
);

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const versionMatch = semverPattern.exec(packageJson.version);

if (!versionMatch) {
    throw new Error(`Invalid SemVer version in package.json: "${packageJson.version}"`);
}

export const packageVersion = packageJson.version;
export const apiVersion = `v${versionMatch[1]}`;

const configuredPrefix = process.env.API_PREFIX || `/api/${apiVersion}`;
const prefixMatch = /^\/(?:[A-Za-z0-9_-]+\/)*v(0|[1-9]\d*)$/.exec(configuredPrefix);

if (!prefixMatch) {
    throw new Error(
        `Invalid API_PREFIX "${configuredPrefix}". It must be an absolute path ending in /${apiVersion}.`
    );
}

if (prefixMatch[1] !== versionMatch[1]) {
    throw new Error(
        `API_PREFIX "${configuredPrefix}" does not match package.json major version ${versionMatch[1]}.`
    );
}

export const apiPrefix = configuredPrefix;
