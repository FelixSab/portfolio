
const config = (_, argv) => {

  return {
    mode: argv.mode,
    output: {
      publicPath: '/'
    },
    devtool: 'eval-source-map',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.webpack.js', '.ts', '.tsx', '.js', '.sass'],
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.tsx?$/,
              loader: 'ts-loader'
            }
          ]
        }
      ]
    }
  };
};

module.exports = config;
