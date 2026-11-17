import urllib.request
import json
import base64

with open("github_repos.json", "r", encoding="utf-8") as f:
    repos = json.load(f)

detailed_repos = []

for repo in repos:
    name = repo["name"]
    branch = repo["default_branch"]
    print(f"Analyzing {name}...")
    
    # 1. Fetch README.md
    readme_content = ""
    readme_url = f"https://api.github.com/repos/bhumikasingh0455/{name}/readme"
    req = urllib.request.Request(readme_url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/vnd.github.v3+json"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            readme_content = base64.b64decode(data["content"]).decode('utf-8', errors='ignore')
    except Exception as e:
        readme_content = ""

    # 2. Fetch package.json if exists
    pkg_content = {}
    pkg_url = f"https://raw.githubusercontent.com/bhumikasingh0455/{name}/{branch}/package.json"
    req_pkg = urllib.request.Request(pkg_url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req_pkg) as resp:
            pkg_content = json.loads(resp.read().decode())
    except Exception as e:
        pkg_content = {}

    # 3. Fetch languages
    lang_url = f"https://api.github.com/repos/bhumikasingh0455/{name}/languages"
    req_lang = urllib.request.Request(lang_url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/vnd.github.v3+json"})
    languages = {}
    try:
        with urllib.request.urlopen(req_lang) as resp:
            languages = json.loads(resp.read().decode())
    except Exception as e:
        languages = {}

    # 4. Search for screenshot files in repo tree
    tree_url = f"https://api.github.com/repos/bhumikasingh0455/{name}/git/trees/{branch}?recursive=1"
    req_tree = urllib.request.Request(tree_url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/vnd.github.v3+json"})
    image_files = []
    try:
        with urllib.request.urlopen(req_tree) as resp:
            tree_data = json.loads(resp.read().decode())
            for item in tree_data.get("tree", []):
                path = item.get("path", "").lower()
                if any(path.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp", ".gif"]):
                    if not any(ignore in path for ignore in ["node_modules", "favicon", "logo", "icon"]):
                        image_files.append(item.get("path"))
    except Exception as e:
        image_files = []

    repo_detail = {
        "summary": repo,
        "readme": readme_content[:3000],  # first 3000 chars of readme
        "package_json": pkg_content,
        "languages": languages,
        "image_files": image_files
    }
    detailed_repos.append(repo_detail)

with open("github_detailed_repos.json", "w", encoding="utf-8") as f:
    json.dump(detailed_repos, f, indent=2)

print("Saved all detailed repo info to github_detailed_repos.json")
