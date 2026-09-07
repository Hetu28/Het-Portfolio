import os
import re

target_dir = r"d:\A.I\het-portfolio"
extensions = (".ts", ".tsx", ".js", ".json", ".css", ".html", ".md")

replacements = [
    ("Â€¢", " • "),
    ("â€¢", " • "),
    ("Ã¢â‚¬Â¢", " • "),
    ("â‚¬Â¢", " • "),
    ("Â·", " • "),
    ("Â—", " — "),
    ("â€”", " — "),
    ("Ã¢â‚¬â€", " — "),
    ("Â–", " – "),
    ("â€“", " – "),
    ("Ã¢â‚¬â€œ", " – "),
    ("â€™", "'"),
    ("Ã¢â‚¬â„¢", "'"),
    ("â€˜", "'"),
    ("â€œ", '"'),
    ("â€\x9d", '"'),
    ("â€", '"'),
    ("Ã¢â‚¬Å“", '"'),
    ("Ã¢â‚¬\x9d", '"'),
    ("Â", ""),
    ("Ã‚", ""),
    ("?", "—"),
    ("", "•"),
]

changed_files = 0

for root, dirs, files in os.walk(target_dir):
    if any(ignore in root for ignore in ["node_modules", ".git", ".next", "_checkpoints", ".restore_points"]):
        continue
    for file in files:
        if file.endswith(extensions):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()

                original = content
                for bad, good in replacements:
                    content = content.replace(bad, good)

                # Clean up any remaining double spaces created around bullets
                content = re.sub(r' +• +', ' • ', content)
                content = re.sub(r' +— +', ' — ', content)

                if content != original:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Cleaned: {file_path}")
                    changed_files += 1
            except Exception as e:
                print(f"Error {file_path}: {e}")

print(f"Total files cleaned: {changed_files}")
