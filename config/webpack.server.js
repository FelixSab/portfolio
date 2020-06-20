const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');

const config = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = !isDevelopment;

  const server = {
    target: 'node',
    entry: paths.serverIndexFile,
    output: {
      filename: 'bundle.js',
      path: paths.serverDistDir
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.module\.s(a|c)ss$/,
              loader: [
                {
                  loader: 'isomorphic-style-loader',
                  options: {
                    esModule: true
                  }
                },
                {
                  loader: 'css-modules-typescript-loader'
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    sourceMap: isDevelopment
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: isDevelopment
                  }
                },
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: paths.cssModuleRessourceFiles,
                  },
                }
              ]
            },
            // File loader must always be last
            {
              loader: 'file-loader',
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: `$[name].[hash:8].[ext]`
              }
            }
          ]
        }
      ]
    },
    externals: [nodeExternals()],
  };

  return merge(common(env, argv), server);
};

module.exports = config;
