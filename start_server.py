import os
import subprocess
import sys

env = os.environ.copy()
env["PATH"] = r"d:\A.I\nodejs;" + env.get("PATH", "")

print("Building Next.js application...")
res = subprocess.run([r"d:\A.I\nodejs\npm.cmd", "run", "build"], cwd=r"d:\A.I\het-portfolio", env=env, capture_output=True, text=True)
print("Build stdout:", res.stdout)
if res.returncode != 0:
    print("Build stderr:", res.stderr)
    sys.exit(1)

print("Starting production server on port 3000...")
p = subprocess.Popen([r"d:\A.I\nodejs\npm.cmd", "run", "start"], cwd=r"d:\A.I\het-portfolio", env=env)
print(f"Production server started with PID {p.pid}")
p.wait()
