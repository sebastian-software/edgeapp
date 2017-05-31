const path = require("path")

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(mjs|js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            // Don't try to find .babelrc because we want to force this configuration.
            babelrc: false,

            // Faster transpiling for minor loose in formatting
            compact: true,

            // Keep origin information alive
            sourceMaps: true,

            // Nobody needs the original comments when having source maps
            comments: false,

            presets:
            [
              // ES2015: let, const, destructuring, classes, no modules
              // ES2016: Exponentiation
              // ES2017: Async to generators + trailing function commas
              [ "babel-preset-env", { modules: false } ],

              // Flow support
              "babel-preset-flow",

              // React JSX
              "babel-preset-react"
            ],

            plugins:
            [
              [ "module-resolver", {
                root: [ path.resolve("src") ]
              }],

              // Allow parsing of import()
              "syntax-dynamic-import",

              // Optimization for lodash imports.
              // Auto cherry-picking es2015 imports from path imports.
              "lodash",

              // class { handleClick = () => { } }
              // https://github.com/tc39/proposal-class-public-fields
              "transform-class-properties",

              // { ...todo, completed: true }
              [ "transform-object-rest-spread", { useBuiltIns: true }],

              // Use helpers, but not polyfills, in a way that omits duplication.
              // For polyfills better use polyfill.io or another more sophisticated solution.
              [ "transform-runtime", {
                regenerator: false,
                polyfill: false,
                useBuiltIns: true,
                useESModules: true
              }]
            ]
          }
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        },
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
}
