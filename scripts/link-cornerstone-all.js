#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const viewerRoot = process.cwd();
const cornerstoneRoot = path.join(viewerRoot, 'cornerstone3d');
const packagesRoot = path.join(cornerstoneRoot, 'packages');

const packageNames = fs
  .readdirSync(packagesRoot)
  .map(dirName => path.join(packagesRoot, dirName, 'package.json'))
  .filter(pkgPath => fs.existsSync(pkgPath))
  .map(pkgPath => ({
    pkgPath,
    json: JSON.parse(fs.readFileSync(pkgPath, 'utf8')),
  }))
  .filter(({ json }) => typeof json.name === 'string' && json.name.startsWith('@cornerstonejs/'))
  .map(({ pkgPath, json }) => ({
    dir: path.dirname(pkgPath),
    name: json.name,
  }));

for (const pkg of packageNames) {
  execSync('yarn link', { cwd: pkg.dir, stdio: 'inherit' });
}

for (const pkg of packageNames) {
  execSync(`yarn link ${pkg.name}`, { cwd: viewerRoot, stdio: 'inherit' });
}

console.log(`Linked ${packageNames.length} Cornerstone packages into ${viewerRoot}`);
