const {override} = require("customize-cra");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const version = 'v0.0.1';

const replaceConfig = () => (config) => {
    
    // 修改js文件路径
    config.output.filename = `static/sso/${version}/js/[name].js`;
    config.output.chunkFilename = `static/sso/${version}/js/[name].chunk.js`;

    // 修改css文件路径
    replaceMiniCssExtractPlugin(config);

    return config;
};

function replaceMiniCssExtractPlugin(config) {
    
    // 通过名称找到该plugin
    const plugin_name = 'MiniCssExtractPlugin';
    const plugin = config.plugins.find(
        (p) => p.constructor.name === plugin_name,
    );

    // 修改该plugin的配置项
    if (plugin != undefined ) {
        plugin.options.filename = `static/sso/${version}/css/[name].css`;
        plugin.options.chunkFilename = `static/sso/${version}/css/[name].chunk.css`;
    }
}

module.exports = override (
    replaceConfig(),
);


// 下面是备用方案

// module.exports = function override(config, env) {
//   config.output.filename = `static/${version}/js/[name].js`;
//   config.output.chunkFilename = `static/${version}/js/[name].chunk.js`;

//   config.plugins = replacePlugin(
//     config.plugins,
//     (name) => /MiniCssExtractPlugin/i.test(name),
//     new MiniCssExtractPlugin({
//       filename: `static/${version}/css/[name].css`,
//       chunkFilename: `static/${version}/css/[name].chunk.css`,
//     })
//   );

//   return config;
// };

// Utility function to replace plugins in the webpack config files used by react-scripts
// function replacePlugin(plugins, nameMatcher, newPlugin) {
//   const pluginIndex = plugins.findIndex((plugin) => {
//     return (
//       plugin.constructor &&
//       plugin.constructor.name &&
//       nameMatcher(plugin.constructor.name)
//     );
//   });

//   if (pluginIndex === -1) return plugins;

//   const nextPlugins = plugins
//     .slice(0, pluginIndex)
//     .concat(newPlugin)
//     .concat(plugins.slice(pluginIndex + 1));

//   return nextPlugins;
// }
