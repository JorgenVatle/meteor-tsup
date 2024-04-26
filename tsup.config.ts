import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./server/main.js'],
    outDir: 'dist',
    skipNodeModulesBundle: true,
    external: ['meteor/*'],
    target: 'es2022',
    format: "esm"
})