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