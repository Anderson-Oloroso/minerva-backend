import { readFileSync } from 'node:fs';
import semver from 'semver';
import './env.config.js';

const packageJson = JSON.parse(
    readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
);

const parsedVersion = semver.parse(packageJson.version);

if (!parsedVersion) {
    throw new Error(`Invalid SemVer version in package.json: "${packageJson.version}"`);
}

export const packageVersion = packageJson.version;
export const apiVersion = `v${parsedVersion.major}`;

const configuredPrefix = process.env.API_PREFIX || `/api/${apiVersion}`;
const prefixMatch = /^\/(?:[A-Za-z0-9_-]+\/)*v(0|[1-9]\d*)$/.exec(configuredPrefix);

if (!prefixMatch) {
    throw new Error(
        `Invalid API_PREFIX "${configuredPrefix}". It must be an absolute path ending in /${apiVersion}.`
    );
}

if (prefixMatch[1] !== String(parsedVersion.major)) {
    throw new Error(
        `API_PREFIX "${configuredPrefix}" does not match package.json major version ${parsedVersion.major}.`
    );
}

export const apiPrefix = configuredPrefix;
