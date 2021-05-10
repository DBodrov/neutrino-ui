const {buildSync} = require('esbuild');
const fs = require('fs-extra');

function docsBuild() {
  fs.rmSync('docs', {recursive: true, force: true});
  buildSync({
    entryPoints: ['./site/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome80', 'firefox80', 'safari12'],
    outdir: './docs',
    loader: {'.svg': 'dataurl', '.png': 'dataurl'},
    define: {
      'process.env.NODE_ENV': 'production',
    },
  });
}

docsBuild();
