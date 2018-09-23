// <project_root>/assets/webpack.config.js
const path = require('path');

const INPUT_SCRIPT_FOLDER = 'javascript';
const OUTPUT_SCRIPT_FOLDER = '../priv/static/js';

// This should mirror your view folders
// e.g., fresh install of Phoenix should give:
const views = [
  {name: 'layout', type: 'js'},
  {name: 'page', type: 'js'}
];

const ENTRY_POINTS = {
  app: `./${INPUT_SCRIPT_FOLDER}/app.js`
};

const dynamicEntryPoints = views.reduce((entryPointsSoFar, {name, type}) => {
  const desiredPath = `./${INPUT_SCRIPT_FOLDER}/${name}/index.${type}`;
  entryPointsSoFar[name] = path.resolve(__dirname, desiredPath);
  return entryPointsSoFar;
}, ENTRY_POINTS);

module.exports = function (env) {
  return {
    devtool: 'cheap-module-source-map',
    entry: dynamicEntryPoints,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, OUTPUT_SCRIPT_FOLDER),
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, INPUT_SCRIPT_FOLDER)],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
  };
};
