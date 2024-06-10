const dependencies = {
  ecmascript: '0.16.8-beta300.6 || 0.16.8-rc300.0 || 0.16.9-rc300.2',
  compilerPlugin: 'isobuild:compiler-plugin@1.0.0',
}

Package.describe({
  name: 'jorgenvatle:tsup',
  version: '2.0.0',
  summary: 'Pre-bundle and watch Meteor project files using ESBuild with source map support.',
  git: 'https://github.com/JorgenVatle/meteor-tsup',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'tsup',
  use: [
    dependencies.ecmascript,
  ],
  sources: ['src/plugin.js'],
});

Package.onUse(function(api) {
  api.use(dependencies.ecmascript);
  api.use(dependencies.compilerPlugin);
});

