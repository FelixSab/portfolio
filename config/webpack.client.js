const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');

const config = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = !isDevelopment;

  const client = {
    entry: paths.clientIndexFile,
    output: {
      filename: isDevelopment ? 'bundle.js' : 'bundle.[hash:8].js',
      path: paths.clientDistDir
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.module\.s(a|c)ss$/,
              loader: [
                {
                  loader: MiniCssExtractPlugin.loader,
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
            {
              test: /\.s(a|c)ss$/,
              exclude: /\.module.(s(a|c)ss)$/,
              loader: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: isDevelopment
                  }
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
    plugins: [
      isProduction && new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
      }),
      isProduction && new BrotliPlugin({
      threshold: 10240,
      minRatio: 0.8
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash:8].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash:8].css'
      })
    ].filter(Boolean)
  };

  return merge(common(env, argv), client);
};

module.exports = config;
