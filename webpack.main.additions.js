const presetEnv = require('@babel/preset-env/lib/index.js');

delete presetEnv.default;
delete presetEnv.isPluginRequired;
delete presetEnv.transformIncludesAndExcludes;

module.exports = {
  module : {
    rules : [

    ]
  },
  plugins : [

  ]
};