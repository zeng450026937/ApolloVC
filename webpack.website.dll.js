const path = require('path');
const webpack = require('webpack');
const webpackRendererDll = require('electron-webpack/webpack.renderer.dll.config.js');
const WebpackRemoveOldAssetsPlugin = require('electron-webpack/out/plugins/WebpackRemoveOldAssetsPlugin.js').WebpackRemoveOldAssetsPlugin;

module.exports = (env) => {
  return new Promise((resolve, reject) => {
    /* get provided config */
    webpackRendererDll(env)
      .then((rendererDllConfig) => {
        rendererDllConfig.target = 'web';
        rendererDllConfig.output.path = path.join(__dirname, 'dist', 'website-dll');
        rendererDllConfig.output.publicPath = '/meeting/join/';
        rendererDllConfig.output.libraryTarget = 'var';
        rendererDllConfig.externals = [];
        rendererDllConfig.plugins = rendererDllConfig.plugins.map(function(plugin) {
          if (plugin instanceof webpack.DllPlugin) {
            plugin.options.path = path.join(__dirname, 'dist', 'website-dll', 'manifest.json');
          }
          if (plugin instanceof WebpackRemoveOldAssetsPlugin) {
            plugin.dllManifest = path.join(__dirname, 'dist', 'website-dll', 'manifest.json');
          }

          return plugin;
        });

        /* return modified config to webpack */
        resolve(rendererDllConfig);
      })
      .catch(() => reject());
  });
};