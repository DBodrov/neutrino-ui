const fse = require('fs-extra');
const {execSync} = require('child_process');

const {resolveApp} = require('./paths');

process.env.NODE_ENV = 'production';

function buildLib() {
  const components = fse
    .readdirSync(resolveApp('src'))
    .filter(folder => folder !== 'index.ts' && folder !== 'types.d.ts' && folder !== 'sealed');

  const sealedComponets = fse.readdirSync(resolveApp('src/sealed')).filter(folder => folder !== 'index.ts');

  console.log('Clear /lib dir');
  fse.emptyDirSync('lib');
  console.log('Create typings....');
  execSync('npm run compile');
  console.log('Typings Done.');

  components.forEach(folder => {
    console.log(`Compile ${folder} ...`);
    execSync(
      `npx babel ${resolveApp(`src/${folder}`)} --out-dir ${resolveApp(
        `lib/${folder}`,
      )} --extensions .tsx,.ts --source-maps --ignore "src/**/*.spec.tsx","__tests__"`,
    );
  });

  sealedComponets.forEach(folder => {
    console.log(`Compile sealed/${folder} ...`);
    execSync(
      `npx babel ${resolveApp(`src/sealed/${folder}`)} --out-dir ${resolveApp(
        `lib/sealed/${folder}`,
      )} --extensions .tsx,.ts --source-maps --ignore "src/**/*.spec.tsx","__tests__"`,
    );
  })

  execSync(`npx babel ${resolveApp('src/index.ts')} --out-file ${resolveApp('lib/index.js')}`);
  execSync(`npx babel ${resolveApp('src/sealed/index.ts')} --out-file ${resolveApp('lib/sealed/index.js')}`);
  console.log('All tasks complete');
}

buildLib();
