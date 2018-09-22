// <project_root>/assets/webpack.config.js
const path = require('path');
const fs = require('fs');

// This should mirror your view folders
// e.g., fresh install of Phoenix should give:
const views = [
    'layout',
    'page'
];

const ENTRY_POINTS = {
    app: './js/app.js'
};

const dynamicEntryPoints = views.reduce((entryPointsSoFar, currentView) => {
    entryPointsSoFar[currentView] = path.resolve(__dirname, `./js/${currentView}/index.js`);
    return entryPointsSoFar;
}, ENTRY_POINTS);

module.exports = function (env) {
    return {
        devtool: 'cheap-module-source-map',
        entry: dynamicEntryPoints,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '../priv/static/js'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    // .js or .jsx
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react'],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-proposal-object-rest-spread'
                                ]
                            }
                        }
                    ]
                }
            ]
        },

        resolve: {
            modules: ['node_modules', path.resolve(__dirname, 'js')],
            extensions: ['.js']
        }
    };
};
