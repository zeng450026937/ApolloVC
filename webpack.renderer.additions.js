const presetEnv = require('@babel/preset-env/lib/index.js');

delete presetEnv.default;
delete presetEnv.isPluginRequired;
delete presetEnv.transformIncludesAndExcludes;

const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

const config = {
  module : {
    rules : [

    ]
  },
  devServer : {
    https : true
  },
  plugins : [
    new VueLoaderPlugin()
  ]
};

module.exports = config;