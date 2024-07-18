const dependencies = {
  ecmascript: 'ecmascript@0.16.9',
  compilerPlugin: 'isobuild:compiler-plugin@1.0.0',
}

const { METEOR_RELEASE } = Object.assign({ METEOR_RELEASE: '2.0.0' }, process.env);
const isMeteorV2 = METEOR_RELEASE?.startsWith('2');
const major = isMeteorV2 ? '1' : '2';

Package.describe({
  name: 'jorgenvatle:tsup',
  version: `${major}.0.1`,
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
  if (METEOR_RELEASE) {
    console.log('📦  Preparing package for Meteor release:', METEOR_RELEASE);
  }

  if (isMeteorV2) {
    api.versionsFrom(['2.14', '2.15', '2.16']);
  } else {
    api.versionsFrom(['3.0-beta.0', '3.0-rc.0', '3.0-rc.2', '3.0.1']);
  }

  api.use(dependencies.ecmascript);
  api.use(dependencies.compilerPlugin);
});

