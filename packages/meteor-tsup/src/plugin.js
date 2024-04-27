import FS from 'node:fs';
import Path from 'node:path';

class Compiler {
    processFilesForTarget(files) {
        files.forEach((file) => {
            file.addJavaScript({
                data: file.getContentsAsString(),
                sourceMap: FS.readFileSync(Path.join(file.getSourceRoot(), file.getPathInPackage() + '.map'), 'utf8'),
            })
        })
    }
}

Plugin.registerCompiler({
    extensions: ['bundle.server.js'],
}, () => new Compiler());