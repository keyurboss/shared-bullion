const fs = require('fs');
const ncc = require('@vercel/ncc');
const { join } = require('path');
const { exit } = require('process');
function ExistOrcreate(path) {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path, {
      recursive: true,
    });
  }
}
// console.log(process.argv);
let project = null;
process.argv.forEach((a) => {
  if (a.includes('--project=')) {
    project = a.replace('--project=', '');
  }
});
if (project === null) {
  exit(0);
}
const distPath = join(__dirname, 'dist', 'apps', project, 'main.js');
console.log(distPath);
if (!fs.existsSync(distPath)) {
  console.log(`file not exists ${distPath}`);
  exit(0);
}
ncc(distPath, {
  cache: false,
  // externals to leave as requires of the build
  // externals: ["externalpackage"],
  // directory outside of which never to emit assets
  filterAssetBase: process.cwd(), // default
  minify: false, // default
  sourceMap: false, // default
  sourceMapBasePrefix: '../', // default treats sources as output-relative
  // when outputting a sourcemap, automatically include
  // source-map-support in the output file (increases output by 32kB).
  sourceMapRegister: true, // default
  watch: false, // default
  v8cache: false, // default
  quiet: false, // default
  debugLog: false, // default
}).then(async ({ code, map, assets }) => {
  let myDir = join(__dirname, 'dist', 'apps', project);
  ExistOrcreate(myDir);
  fs.writeFile(join(myDir, 'main.pro.js'), code);
});
