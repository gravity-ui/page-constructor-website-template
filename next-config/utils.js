const {join} = require('path');
const {BUILD_FOLDER, INTEGRITY_MANIFEST_FILENAME} = require('./constants');

function getBuildMode() {
    return process.env.EXPORT_MODE ? 'export' : 'default';
}

function getPreprocessLoader() {
    return {
        test: /\.[jt]sx?$/,
        use: [
            {
                loader: 'webpack-preprocessor-loader',
                options: {
                    params: {
                        BUILD_MODE: getBuildMode(),
                    },
                },
            },
        ],
    };
}

function getIntegrityManifestPath() {
    return join(BUILD_FOLDER, INTEGRITY_MANIFEST_FILENAME);
}

module.exports = {
    getBuildMode,
    getPreprocessLoader,
    getIntegrityManifestPath,
};
