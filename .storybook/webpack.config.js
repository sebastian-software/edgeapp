module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query:
            {
              sourceMap: true,
              modules: true,
              localIdentName: "[path][name]-[local]",
              minimize: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            query:
            {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
