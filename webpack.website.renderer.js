const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env) => 
{
  return new Promise((resolve, reject) => 
  {
    /* get provided config */
    webpackRenderer(env)
      .then((rendererConfig) => 
      {       
        rendererConfig.target = 'web';
        rendererConfig.output.path = path.join(__dirname, 'dist', 'website');
        rendererConfig.output.publicPath = '/meeting/join/';
        rendererConfig.output.libraryTarget = 'var';
        rendererConfig.externals = [];
        rendererConfig.plugins = rendererConfig.plugins.map(function(plugin)
        {
          if (plugin instanceof webpack.DllReferencePlugin)
          {
            plugin.options.manifest = require(path.join(__dirname, 'dist', 'website-dll', 'manifest.json'));
          }
          if (plugin instanceof HtmlWebpackPlugin && plugin.options.filename === 'index.html')
          {
            Object.assign(plugin.options, {
              filename : 'index.html',
              template : path.join(__dirname, 'src', 'renderer', 'index.html'),
              minify   : false
            });
          }
          if (plugin instanceof webpack.EnvironmentPlugin)
          {
            Object.assign(plugin.defaultValues, {
              HOST        : 'web',
              PUBLIC_PATH : rendererConfig.output.publicPath
            });
          }

          return plugin;
        });

        if (isDevelopment)
        {
          rendererConfig.devServer.contentBase.push(path.join(__dirname, 'dist', 'website-dll'));
          rendererConfig.devServer.open = true;
          rendererConfig.devServer.openPage = 'meeting/join/';
          // rendererConfig.devServer.host = '0.0.0.0';
        }

        let assets = fs.readdirSync(path.join(__dirname, 'dist', 'website-dll')) || [];

        assets.push('configuration.js');

        assets = assets.filter(function(it)
        {
          return it.endsWith('.js') || it.endsWith('.css');
        }).sort();

        rendererConfig.plugins.push(
          new HtmlWebpackIncludeAssetsPlugin({
            assets : assets,
            append : false
          }),
          new FaviconsWebpackPlugin(path.join(__dirname, 'src', 'renderer', 'favicon.png')),
          new CopyWebpackPlugin([ 
            { 
              from  : path.join(__dirname, 'dist', 'website-dll'),
              to    : path.join(__dirname, 'dist', 'website'),
              froce : true
            },
            { 
              from  : path.join(__dirname, 'configuration.js'),
              to    : path.join(__dirname, 'dist', 'website'),
              froce : true
            },
            {
              from  : path.join(__dirname, 'src', 'renderer', 'assets', 'img'),
              to    : path.join(__dirname, 'dist', 'website', 'assets', 'img'),
              froce : true
            },
            {
              from  : path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
              to    : path.join(__dirname, 'dist', 'website', 'assets', 'js'),
              froce : true
            },
            {
              from  : path.join(__dirname, 'node_modules', 'screenfull', 'dist', 'screenfull.js'),
              to    : path.join(__dirname, 'dist', 'website', 'assets', 'js'),
              froce : true
            }
          ])
        );

        /* return modified config to webpack */
        resolve(rendererConfig);
      })
      .catch(() => reject());
  });
};