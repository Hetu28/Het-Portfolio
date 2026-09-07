import os
import shutil
import datetime
import subprocess

repo_root = r'D:\A.I\het-portfolio'
checkpoints_root = os.path.join(repo_root, '_checkpoints')
master_checkpoint = os.path.join(checkpoints_root, 'checkpoint_parity_complete')

restore_points_root = os.path.join(repo_root, '.restore_points')
latest_restore_point = os.path.join(restore_points_root, 'latest')

now = datetime.datetime.now()
now_display = now.strftime("%Y-%m-%d %H:%M:%S")
now_str = now.strftime("%Y%m%d_%H%M%S")
timestamped_checkpoint = os.path.join(checkpoints_root, f'checkpoint_{now_str}')
timestamped_savepoint = os.path.join(restore_points_root, f'savepoint_{now_str}')

os.makedirs(master_checkpoint, exist_ok=True)
os.makedirs(timestamped_checkpoint, exist_ok=True)
os.makedirs(latest_restore_point, exist_ok=True)
os.makedirs(timestamped_savepoint, exist_ok=True)

# 1. Update restore_checkpoint.bat
restore_bat_content = f"""@echo off
title Het Patel Portfolio - Restore Checkpoint
echo ===================================================
echo   RESTORE POINT - HET PATEL PORTFOLIO
echo   Last Updated: {now_display}
echo ===================================================
echo.
echo WARNING: This will overwrite current working files with
echo the verified checkpoint state.
echo.
set /p confirm="Do you want to proceed? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Restore cancelled.
    pause
    exit /b
)

echo.
echo Restoring files from _checkpoints\\checkpoint_parity_complete ...

xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\app" "app"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\components" "components"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\data" "data"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\public" "public"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\styles" "styles"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\scripts" "scripts"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\CV" "CV"
xcopy /E /I /Y "_checkpoints\\checkpoint_parity_complete\\Logos" "Logos"

copy /Y "_checkpoints\\checkpoint_parity_complete\\package.json" "package.json"
copy /Y "_checkpoints\\checkpoint_parity_complete\\package-lock.json" "package-lock.json"
copy /Y "_checkpoints\\checkpoint_parity_complete\\tailwind.config.ts" "tailwind.config.ts"
copy /Y "_checkpoints\\checkpoint_parity_complete\\next.config.mjs" "next.config.mjs"
copy /Y "_checkpoints\\checkpoint_parity_complete\\postcss.config.js" "postcss.config.js"
copy /Y "_checkpoints\\checkpoint_parity_complete\\tsconfig.json" "tsconfig.json"

echo.
echo ===================================================
echo   SUCCESS: PORTFOLIO RESTORED TO {now_display}!
echo ===================================================
pause
"""

restore_bat_path = os.path.join(repo_root, 'restore_checkpoint.bat')
with open(restore_bat_path, 'w', encoding='utf-8') as f:
    f.write(restore_bat_content)
print(f"Updated {restore_bat_path} with timestamp {now_display}")

# 2. Update restore_latest_savepoint.bat
restore_latest_bat_content = f"""@echo off
title Restore to Latest Save Point ({now_display})
color 0E
echo ========================================================
echo        HET PATEL PORTFOLIO - RESTORE POINT RECOVERY
echo ========================================================
echo.
echo Restoring project to Save Point: {now_display} ...
echo.
xcopy /E /Y /I "D:\\A.I\\het-portfolio\\.restore_points\\latest\\*" "D:\\A.I\\het-portfolio\\"
echo.
echo [OK] Restore complete! Project is reverted to {now_display}.
pause
"""
restore_latest_bat_path = os.path.join(repo_root, 'restore_latest_savepoint.bat')
with open(restore_latest_bat_path, 'w', encoding='utf-8') as f:
    f.write(restore_latest_bat_content)
print(f"Updated {restore_latest_bat_path} with timestamp {now_display}")

# 3. Update save_checkpoint.bat
save_bat_content = f"""@echo off
title Het Patel Portfolio - Save Checkpoint
echo ===================================================
echo   SAVING PORTFOLIO CHECKPOINT & RESTORE POINT
echo ===================================================
echo.
echo Current Timestamp: %date% %time%
echo Saving state to _checkpoints\\checkpoint_parity_complete ...
echo.

"D:\\A.I\\Python\\python.exe" "D:\\A.I\\het-portfolio\\scripts\\save_checkpoint_now.py"

echo.
echo ===================================================
echo   CHECKPOINT SAVED & RESTORE POINT UPDATED!
echo ===================================================
pause
"""
save_bat_path = os.path.join(repo_root, 'save_checkpoint.bat')
with open(save_bat_path, 'w', encoding='utf-8') as f:
    f.write(save_bat_content)

dirs_to_copy = ['app', 'components', 'data', 'public', 'styles', 'scripts', 'CV', 'Logos', 'docs']
files_to_copy = [
    'package.json', 'package-lock.json', 'tailwind.config.ts', 'next.config.mjs',
    'postcss.config.js', 'tsconfig.json', '.gitignore',
    'start_site.bat', 'start_server.py', 'start_live_review_link.bat',
    'save_checkpoint.bat', 'restore_checkpoint.bat', 'restore_latest_savepoint.bat'
]

print("Overwriting master checkpoint at:", master_checkpoint)
print("Creating timestamped checkpoint at:", timestamped_checkpoint)
print("Overwriting latest restore point at:", latest_restore_point)

# Copy directories to master & latest & timestamped
for d in dirs_to_copy:
    src_dir = os.path.join(repo_root, d)
    if os.path.exists(src_dir):
        # To master checkpoint
        dst_master = os.path.join(master_checkpoint, d)
        if os.path.exists(dst_master):
            shutil.rmtree(dst_master)
        shutil.copytree(src_dir, dst_master, ignore=shutil.ignore_patterns('films', '*.mp4'), symlinks=True)

        # To timestamped checkpoint
        dst_ts = os.path.join(timestamped_checkpoint, d)
        if os.path.exists(dst_ts):
            shutil.rmtree(dst_ts)
        shutil.copytree(src_dir, dst_ts, ignore=shutil.ignore_patterns('films', '*.mp4'), symlinks=True)

        # To latest restore point
        dst_latest = os.path.join(latest_restore_point, d)
        if os.path.exists(dst_latest):
            shutil.rmtree(dst_latest)
        shutil.copytree(src_dir, dst_latest, ignore=shutil.ignore_patterns('films', '*.mp4'), symlinks=True)

        # To timestamped savepoint
        dst_save_ts = os.path.join(timestamped_savepoint, d)
        if os.path.exists(dst_save_ts):
            shutil.rmtree(dst_save_ts)
        shutil.copytree(src_dir, dst_save_ts, ignore=shutil.ignore_patterns('films', '*.mp4'), symlinks=True)

        print(f"Copied directory: {d}")

# Copy files
for f in files_to_copy:
    src_file = os.path.join(repo_root, f)
    if os.path.exists(src_file):
        shutil.copy2(src_file, os.path.join(master_checkpoint, f))
        shutil.copy2(src_file, os.path.join(timestamped_checkpoint, f))
        shutil.copy2(src_file, os.path.join(latest_restore_point, f))
        shutil.copy2(src_file, os.path.join(timestamped_savepoint, f))
        print(f"Copied file: {f}")

# Update scripts/save_checkpoint_now.py as well
save_script_path = os.path.join(repo_root, 'scripts', 'save_checkpoint_now.py')
with open(__file__, 'r', encoding='utf-8') as current_script:
    script_body = current_script.read()
with open(save_script_path, 'w', encoding='utf-8') as out_save_script:
    out_save_script.write(script_body)
print(f"Updated {save_script_path}")

print("\nUpdating Git repository commit and tags...")
git_env = os.environ.copy()
git_env["PATH"] = r"D:\A.I\Git\Git\cmd;" + git_env.get("PATH", "")

try:
    subprocess.run(["git", "checkout", "-B", "main"], cwd=repo_root, env=git_env, capture_output=True)
    subprocess.run(["git", "add", "-A"], cwd=repo_root, env=git_env, capture_output=True)
    commit_msg = f"Save Point: Bento redesigned, Director Statement centered, Filmmaker DNA & Endorsements removed ({now_display})"
    commit_res = subprocess.run(["git", "commit", "-m", commit_msg], cwd=repo_root, env=git_env, capture_output=True, text=True)
    print("Git commit result:", commit_res.stdout or commit_res.stderr)
    
    subprocess.run(["git", "tag", "-f", "-a", "checkpoint-v1", "-m", f"Master Checkpoint updated {now_str}"], cwd=repo_root, env=git_env, capture_output=True)
    subprocess.run(["git", "tag", "-f", "-a", "checkpoint_parity_complete", "-m", f"Master Checkpoint updated {now_str}"], cwd=repo_root, env=git_env, capture_output=True)
    subprocess.run(["git", "tag", "-f", "-a", "save-point-latest", "-m", f"Save Point updated {now_str}"], cwd=repo_root, env=git_env, capture_output=True)
    subprocess.run(["git", "tag", "-a", f"checkpoint_{now_str}", "-m", f"Saved checkpoint {now_str}"], cwd=repo_root, env=git_env, capture_output=True)
    subprocess.run(["git", "tag", "-a", f"savepoint-{now_str}", "-m", f"Saved savepoint {now_str}"], cwd=repo_root, env=git_env, capture_output=True)
    print("Git tags updated successfully!")
except Exception as e:
    print("Git update notice:", e)

print(f"\n[SUCCESS] Checkpoint, Save Point, and Restore Point overwritten and updated to {now_display} successfully!")
