# Meteor TSUp
Pre-bundle your Meteor project using [`tsup`](https://github.com/egoist/tsup#tsup). Acts as a replacement for Meteor's
official [`typescript`](https://guide.meteor.com/build-tool#typescript) Atmosphere package.

## How it works
This plugin feeds a bundle produced by `tsup` into Meteor, including source maps. It works essentially the same way as
the official `typescript` package. But it's faster, despite the extra build step.

We've intentionally opted to running the tsup watcher separate from the Meteor runtime as long-running child processes
created by Meteor has a tendency to become unstable after a while. You do need to run the `tsup` watcher yourself.
Packages like [`concurrently`](https://github.com/open-cli-tools/concurrently) help make this a better experience.

This package is intended only to speed up Meteor server restarts. If you're frustrated with slow updates when working
with client-side code, you should probably look at [`meteor-vite`](https://github.com/JorgenVatle/meteor-vite) 
drastically improves front-end developer experience through lightning fast HMR. ⚡ 

## Setup
Install `tsup` and `jorgenvatle:tsup`. Optionally also [`concurrently`](https://github.com/open-cli-tools/concurrently)
to run the `tsup` watcher alongside Meteor.

```sh
# Install the build plugin
meteor add jorgenvatle:tsup

# If you're using Meteor v3, install the beta version instead
# meteor add jorgenvatle:tsup@2.0-beta.0

# Install npm dependencies
meteor npm i -D tsup concurrently
```

Create a `tsup.config.ts` config file in your Meteor project's root directory. 
```ts
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    target: 'node14', // For Meteor v3 you'll probably want to use 'node21'
    entry: {
        // Replace 'server/main.ts' with the path to your Meteor server's 
        // mainModule configured in your package.json.
        'esbuild.bundle': 'server/main.ts', 
    },
    outDir: 'server/_bundle',
    skipNodeModulesBundle: true,
    sourcemap: true,
    platform: 'node',
    outExtension: ({ format }) => ({ js: '.server.js' }),
    format: "cjs",
    loader: {
        // Omit any Vue components from the server bundle.
        '.vue': 'empty',
    },
    esbuildPlugins: [
        // Prevent ESBuild from trying to resolve Meteor packages.
        {
            name: 'external-meteor',
            setup(build) {
                build.onResolve({ filter: /^meteor\// }, (args) => ({
                    path: args.path,
                    namespace: 'meteor',
                    external: true,
                }));
            }
        }
    ]
})
```

Update your Meteor server's `mainModule` path in your `package.json`. And update your start script to also launch `tsup`.
```json5
// package.json
{
  "name": "my-meteor-project",
  "scripts": {
    "start": "concurrently npm:start:tsup npm:start:meteor",
    "start:meteor": "meteor run",
    "start:tsup": "tsup --watch"
  },
  "meteor": {
      "mainModule": {
        "server": "server/main.js", // This should be a js file. Not .ts. See below.
        "client": ...,
      }
  },
}
```

Create a `server/main.js` file to import your TSUp build output.

```js
// server/main.js
import './_bundle/main.esbuild.bundle.server';
```

Now, just launch Meteor using your updated start script. And you're all set.
```sh
meteor npm start
```

## But why?
When working with larger Meteor projects, the Meteor file watcher can become excessively sluggish. Meteor processes
TypeScript modules individually. This is not only slow, but it also comes with 
[a few other caveats](https://github.com/meteor/meteor/tree/devel/packages/typescript#supported-typescript-features).

Particularly, some modules might not be compiled without emitting any sort of warning message. Leading to issues at 
runtime where some modules might just not exist in your bundle. This can be incredibly tricky to debug, especially for
larger applications.

## License
MIT