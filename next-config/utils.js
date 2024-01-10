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

module.exports = {
    getBuildMode,
    getPreprocessLoader,
};
