import React from 'react';
import {readFileSync} from 'fs';
import {checkIsDev} from './env';
import logger from '../logger';

interface ManifestAsset {
    src: string;
    integrity: string;
}

type IntegrityManifest = Record<string, string>;

const MANIFEST_PATH = '.next/assets-manifest.json';
const HASH_FUNC_NAME = 'sha384';
let integrityManifest: IntegrityManifest;

export function getIntegrityManifest() {
    if (!integrityManifest) {
        try {
            const assetsManifests = JSON.parse(readFileSync(MANIFEST_PATH).toString()) as Record<
                string,
                ManifestAsset
            >;

            integrityManifest = Object.values(assetsManifests).reduce<IntegrityManifest>(
                (result, {src, integrity}) => {
                    const hash = getHashByFuncName(integrity, HASH_FUNC_NAME);

                    if (hash) {
                        result[src] = hash;
                    }

                    return result;
                },
                {},
            );
        } catch (error) {
            logger.error(error, 'INTEGRITY_MANIFEST_ERROR');
            integrityManifest = {};
        }
    }

    return integrityManifest;
}

export function addIntegrity(scripts: JSX.Element[]) {
    if (checkIsDev()) {
        return scripts;
    }

    const manifest = getIntegrityManifest();

    return scripts.map((script) => {
        if (script.key && manifest[script.key]) {
            return React.cloneElement(script, {
                integrity: manifest[script.key],
                crossorigin: 'anonymous',
            });
        }

        return script;
    });
}

function getHashByFuncName(fullIntegrity: string, funcName: string) {
    return fullIntegrity.split(' ').find((hash) => hash.startsWith(funcName));
}
