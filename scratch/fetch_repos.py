import urllib.request
import json
import os

username = "bhumikasingh0455"
url = f"https://api.github.com/users/{username}/repos?per_page=100"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/vnd.github.v3+json"})

try:
    with urllib.request.urlopen(req) as resp:
        repos = json.loads(resp.read().decode())
        print(f"Total repos: {len(repos)}")
        output = []
        for r in repos:
            repo_info = {
                "name": r.get("name"),
                "full_name": r.get("full_name"),
                "description": r.get("description"),
                "html_url": r.get("html_url"),
                "homepage": r.get("homepage"),
                "topics": r.get("topics", []),
                "language": r.get("language"),
                "stargazers_count": r.get("stargazers_count"),
                "forks_count": r.get("forks_count"),
                "updated_at": r.get("updated_at"),
                "default_branch": r.get("default_branch", "main")
            }
            output.append(repo_info)
        
        with open("github_repos.json", "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2)
        print("Successfully saved to github_repos.json")
except Exception as e:
    print("Error:", e)
