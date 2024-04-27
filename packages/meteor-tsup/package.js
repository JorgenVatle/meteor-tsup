const dependencies = {
  ecmascript: 'ecmascript@0.16.8 || 1.0.0',
}

Package.describe({
  name: 'jorgenvatle:meteor-tsup',
  version: '1.0.0',
  summary: 'Pre-bundle and watch Meteor project files using ESBuild with source map support.',
  git: 'https://github.com/JorgenVatle/meteor-tsup',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'tsup',
  use: [
    dependencies.ecmascript,
  ],
  sources: ['plugin.js'],
});

Package.onUse(function(api) {});

