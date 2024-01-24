import React from 'react';
import {readFileSync} from 'fs';
import {checkIsDev} from './env';
import logger from '../logger';
import {getIntegrityManifestPath} from '../../../next-config/utils';

export type IntegrityManifest = Record<string, string>;

let integrityManifest: IntegrityManifest;

export function getIntegrityManifest() {
    if (!integrityManifest) {
        const manifestPath = getIntegrityManifestPath();

        try {
            integrityManifest = JSON.parse(
                readFileSync(manifestPath).toString(),
            ) as IntegrityManifest;
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
