const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const checkpointDir = path.join(rootDir, '_checkpoints', 'checkpoint_parity_complete');

console.log('Target checkpoint directory:', checkpointDir);

// Ensure checkpoint directory exists
if (fs.existsSync(checkpointDir)) {
  fs.rmSync(checkpointDir, { recursive: true, force: true });
}
fs.mkdirSync(checkpointDir, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const foldersToCopy = ['app', 'components', 'data', 'public', 'styles', 'scripts', 'CV', 'Logos', 'docs'];
for (const folder of foldersToCopy) {
  const src = path.join(rootDir, folder);
  const dest = path.join(checkpointDir, folder);
  if (fs.existsSync(src)) {
    console.log(`Copying folder ${folder}...`);
    copyRecursive(src, dest);
  }
}

const filesToCopy = [
  'package.json',
  'tailwind.config.ts',
  'next.config.mjs',
  'postcss.config.js',
  'tsconfig.json',
  '.gitignore',
  'start_site.bat',
  'save_checkpoint.bat',
  'restore_checkpoint.bat',
  'README.md'
];

for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(checkpointDir, file);
  if (fs.existsSync(src)) {
    console.log(`Copying file ${file}...`);
    fs.copyFileSync(src, dest);
  }
}

console.log('Checkpoint files updated successfully in _checkpoints/checkpoint_parity_complete');

// Update Git commit and tag
try {
  const gitPath = 'D:\\A.I\\Git\\Git\\cmd\\git.exe';
  const gitCmd = fs.existsSync(gitPath) ? `"${gitPath}"` : 'git';
  console.log('Updating git repository...');
  
  execSync(`${gitCmd} checkout -B main`, { cwd: rootDir, stdio: 'inherit' });
  execSync(`${gitCmd} add .`, { cwd: rootDir, stdio: 'inherit' });
  try {
    execSync(`${gitCmd} commit -m "Update checkpoint: live reference parity complete & verified"`, { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.log('No new changes to commit to git.');
  }
  execSync(`${gitCmd} tag -f -a checkpoint-v1 -m "Checkpoint Parity Complete - Updated version"`, { cwd: rootDir, stdio: 'inherit' });
  execSync(`${gitCmd} tag -f -a checkpoint_parity_complete -m "Checkpoint Parity Complete - Updated version"`, { cwd: rootDir, stdio: 'inherit' });
  console.log('Git commit and tags checkpoint-v1 & checkpoint_parity_complete updated successfully!');
} catch (err) {
  console.error('Git update warning:', err.message);
}
