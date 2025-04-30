const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const yaml = require("yaml");


const TAILWINDCSS_INPUT_DIR =
process.env.npm_package_config_tailwindcss_inputDir;
const REACT_PAGES_DIR = process.env.npm_package_config_webpack_reactPagesDir;
const JEKYLL_SOURCE_DIR = process.env.npm_package_config_jekyll_source;
const JEKYLL_CONFIG_FNAME =
process.env.npm_package_config_jekyll_webpackConfigFilename;
const OUTPUT_DIR = process.env.npm_package_config_webpack_outputDir;

const stylesheetsDirpath = path.resolve(__dirname, TAILWINDCSS_INPUT_DIR);
const reactPageSources = path.resolve(__dirname, REACT_PAGES_DIR);
const outputDirpath = path.resolve(__dirname, OUTPUT_DIR);
const jekyllConfigFilepath = path.resolve(__dirname, JEKYLL_CONFIG_FNAME);

const entryFiles = {};
fs.readdirSync(reactPageSources).forEach((file) => {
  if (file.endsWith(".jsx")) {
    const name = path.parse(file).name; // Use the file name (without extension) as the entry name
    entryFiles[name] = path.resolve(__dirname, REACT_PAGES_DIR, file);
  }
});

const cssFilenames = fs
  .readdirSync(stylesheetsDirpath)
  .map((file) => path.parse(file).base);
const jekyllConfig = {
  source: JEKYLL_SOURCE_DIR,
  destination: OUTPUT_DIR,
  keep_files: Object.entries(entryFiles)
    .map(([fname, _]) => `${fname}.js`)
    .concat(cssFilenames)
}
fs.writeFileSync(jekyllConfigFilepath, yaml.stringify(jekyllConfig));


module.exports = {
  entry: entryFiles,
  output: {
    filename: "[name].js",
    path: outputDirpath,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // For Tailwind and other PostCSS plugins
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        MATOMO_URL: process.env.MATOMO_URL
          ? "'" + process.env.MATOMO_URL + "'"
          : undefined,
        MATOMO_TAG_MANAGER_CONTAINER: process.env.MATOMO_TAG_MANAGER_CONTAINER
          ? "'" + process.env.MATOMO_TAG_MANAGER_CONTAINER + "'"
          : undefined
      }
    })
  ]
};
