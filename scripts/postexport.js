const {join} = require('path');
const crypto = require('crypto');
const {globSync} = require('glob');
const {readFileSync, writeFileSync} = require('fs');

const BUILD_DIR = '.next';
const ASSETS_MANIFEST_PART = join(BUILD_DIR, 'assets-manifest.json');
const NEXT_OUT_DIR = 'out';
const POSTBUILD_PATCHED_FILES = ['_ssgManifest.js'];
const SHA_FUNC = 'sha384';

const assetsManifest = JSON.parse(readFileSync(ASSETS_MANIFEST_PART).toString());

// Next.js patches some script files (like '_ssgManifest.js') after build, so need to run script like this to recalculate patched file hashes and replace it in html files
function main() {
    const replacementPairs = POSTBUILD_PATCHED_FILES.map(getReplacementPair).filter(Boolean);

    replaceInPages(replacementPairs);
}

function getReplacementPair(fileName) {
    const fileInfo = getFileInfo(fileName);

    if (fileInfo) {
        const {src, integrity} = fileInfo;
        const content = readFileSync(join(BUILD_DIR, src)).toString();
        const postBuildIntegrity = getIntegrity(content);

        return [integrity, postBuildIntegrity];
    }

    return null;
}

function replaceInPages(replacementPairs) {
    globSync(`${NEXT_OUT_DIR}/**/*.html`).forEach((pageFile) => {
        const content = readFileSync(pageFile).toString();
        const newContent = replacementPairs.reduce(
            (result, [oldValue, newValue]) => result.replaceAll(oldValue, newValue),
            content,
        );

        writeFileSync(pageFile, newContent);
    });
}

function getFileInfo(fileName) {
    return Object.entries(assetsManifest).find(([asset]) => asset.includes(fileName))?.[1];
}

function getIntegrity(content) {
    const digest = crypto.createHash(SHA_FUNC).update(content, 'utf8').digest();

    return `${SHA_FUNC}-${digest.toString('base64')}`;
}

main();
