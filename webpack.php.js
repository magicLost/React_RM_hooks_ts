const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./php_ssr/makeRenderFiles.tsx",

  target: "node",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "php_ssr", "build")
  },

  externals: [webpackNodeExternals()],

  node: {
    __dirname: false
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "php_ssr")
        ],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: "last 2 Chrome versions"
              }
            ],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import"
          ]
        }
      },
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          "css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]",
          "sass-loader" //if we use resolve-url-loader we must sourceMap=true
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          "file-loader?name=static/media/[name].[hash:8].[ext]"
          //"image-webpack-loader" //?webp=75
        ]
      },
      {
        test: /\.svg$/,
        loaders: [
          { loader: "file-loader?name=static/media/[name].[hash:8].[ext]" }
          /*  {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                //{convertColors: {shorthex: false}},
                //{convertPathData: false}
                { removeViewBox: false },
                { cleanupIDs: false }
              ]
            }
          } */
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=[name].[hash:8].[ext]"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `styles/[name].css`
    }),
    new CleanWebpackPlugin()
  ]
};
