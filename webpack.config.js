module.exports = {
  entry: './src/ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: 'useHistoryReducer',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom',
  },
  optimization: {
    minimize: false,
  },
}
