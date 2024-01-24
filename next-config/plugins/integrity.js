const {SubresourceIntegrityPlugin} = require('webpack-subresource-integrity');
const {writeFileSync} = require('fs');

const {getIntegrityManifestPath} = require('../utils');

const defaultOptions = {
    hashFuncNames: ['sha384'],
};

class InterityManifestPlugin {
    constructor(options = defaultOptions) {
        this.options = options;
    }

    apply(compiler) {
        const {hashFuncNames} = this.options;

        new SubresourceIntegrityPlugin({
            hashFuncNames,
            enabled: true,
        }).apply(compiler);

        compiler.hooks.done.tap('InterityManifestPlugin', (stats) => {
            const integrityValues = stats.toJson().assets.reduce((result, {name, integrity}) => {
                result[name] = integrity;

                return result;
            }, {});

            writeFileSync(getIntegrityManifestPath(), JSON.stringify(integrityValues, null, 2));
        });
    }
}

module.exports = {
    InterityManifestPlugin,
};
