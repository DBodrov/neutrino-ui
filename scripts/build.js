const fse = require('fs-extra');
const {execSync} = require('child_process');

const {resolveApp} = require('./paths');

process.env.NODE_ENV = 'production';

function buildLib() {
    const components = fse.readdirSync(resolveApp('src')).filter(folder => folder !== 'index.ts');
    console.log('Clear Lib dir');
    fse.emptyDirSync('lib');
    console.log('Compile....')
    execSync(`yarn compile`);
    console.log('Done.')

    // components.forEach(folder => {
    //     console.log(`Compile ${folder} ...`)
    //     // execSync(`npx babel ${resolveApp(`src/${folder}`)} --out-dir ${resolveApp(`lib/${folder}`)} --extensions .tsx,.ts --source-maps --ignore "src/**/*.spec.tsx","__tests__"`);
    // })
}

buildLib();
