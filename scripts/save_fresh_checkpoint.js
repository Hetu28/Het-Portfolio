const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const checkpointsDir = path.join(rootDir, "_checkpoints");
const masterCheckpointDir = path.join(checkpointsDir, "checkpoint_parity_complete");

console.log("Starting checkpoint refresh...");

// 1. Remove all old checkpoint folders in _checkpoints
if (fs.existsSync(checkpointsDir)) {
  const entries = fs.readdirSync(checkpointsDir);
  for (const entry of entries) {
    const fullPath = path.join(checkpointsDir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`Removing previous checkpoint: ${entry}`);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  }
} else {
  fs.mkdirSync(checkpointsDir, { recursive: true });
}

// 2. Create fresh master checkpoint folder
fs.mkdirSync(masterCheckpointDir, { recursive: true });

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy source folders
const foldersToCopy = ["app", "components", "data", "public", "styles", "scripts", "docs", "CV", "Logos"];
for (const folder of foldersToCopy) {
  const srcFolder = path.join(rootDir, folder);
  const destFolder = path.join(masterCheckpointDir, folder);
  if (fs.existsSync(srcFolder)) {
    copyDirRecursive(srcFolder, destFolder);
    console.log(`✓ Copied ${folder}/ to checkpoint`);
  }
}

// 4. Copy config and launcher files
const filesToCopy = [
  "package.json",
  "package-lock.json",
  "tailwind.config.ts",
  "next.config.mjs",
  "postcss.config.js",
  "tsconfig.json",
  ".gitignore",
  "start_site.bat",
  "start_server.py",
  "save_checkpoint.bat",
  "restore_checkpoint.bat",
];

for (const file of filesToCopy) {
  const srcFile = path.join(rootDir, file);
  const destFile = path.join(masterCheckpointDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✓ Copied ${file} to checkpoint`);
  }
}

// 5. Git commit and tag update
try {
  const gitEnv = { ...process.env, PATH: `D:\\A.I\\Git\\Git\\cmd;${process.env.PATH}` };
  execSync("git add -A", { cwd: rootDir, env: gitEnv, stdio: "inherit" });
  execSync('git commit -m "feat: Apple Liquid Glass Navigation Header and master checkpoint"', {
    cwd: rootDir,
    env: gitEnv,
    stdio: "inherit",
  });
  execSync('git tag -f -a "checkpoint_parity_complete" -m "Master Checkpoint updated with Apple Liquid Glass"', {
    cwd: rootDir,
    env: gitEnv,
    stdio: "inherit",
  });
  execSync('git tag -f -a "checkpoint-v1" -m "Master Checkpoint updated with Apple Liquid Glass"', {
    cwd: rootDir,
    env: gitEnv,
    stdio: "inherit",
  });
  console.log("✓ Git commit and tags updated successfully!");
} catch (e) {
  console.log("Git step completed or nothing to commit.");
}

console.log("\n=======================================================");
console.log("ALL PREVIOUS CHECKPOINTS OVERWRITTEN & SAVED CLEANLY!");
console.log(`Master location: ${masterCheckpointDir}`);
console.log("=======================================================\n");
