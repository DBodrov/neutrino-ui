const {buildSync} = require('esbuild');
const fs = require('fs-extra');

function docsBuild() {
  fs.rmSync('../docs', {recursive: true});
  buildSync({
    entryPoints: ['../site/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outdir: '../docs',
    loader: {'.svg': 'dataurl', '.png': 'dataurl'},
    define: {
      'process.env.NODE_ENV': 'production',
    },
  });
}
