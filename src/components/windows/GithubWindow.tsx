import { useEffect, useState } from "react";

const GITHUB_USER = "akshaanrajawat";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  language?: string;
}

// Unofficial public API for pinned repos
// https://gh-pinned-repos.egoist.dev/?username=<user>
interface PinnedRepo {
  repo: string;
  owner: string;
  link: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

const GithubWindow = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        // Try pinned repos first via public API
        const [userRes, pinnedRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USER}`),
        ]);
        if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.status}`);
        const userJson = (await userRes.json()) as GithubUser;

        let displayRepos: GithubRepo[] = [];
        if (pinnedRes.ok) {
          const pins = (await pinnedRes.json()) as PinnedRepo[];
          displayRepos = pins.slice(0, 6).map((p, idx) => ({
            id: idx + 1,
            name: p.repo,
            html_url: p.link,
            description: p.description || undefined,
            stargazers_count: p.stars,
            language: p.language || undefined,
          }));
        }

        // Fallback to recently updated repos if pinned API fails or returns empty
        if (displayRepos.length === 0) {
          const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`,
          );
          if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.status}`);
          const reposJson = (await reposRes.json()) as GithubRepo[];
          displayRepos = reposJson;
        }
        if (!alive) return;
        setUser(userJson);
        setRepos(displayRepos);
        setError(null);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to load GitHub preview");
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchData();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] text-[#c9d1d9]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#161b22]">
        <div className="text-sm truncate">{GITHUB_URL}</div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2 py-1 border border-white/20 rounded hover:bg-white/10"
        >
          Open in GitHub
        </a>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading && <div className="text-sm text-[#8b949e]">Loading…</div>}
        {error && (
          <div className="text-sm text-red-400">
            {error}. Use the button above to open the profile.
          </div>
        )}
        {!loading && !error && user && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
              <div>
                <div className="text-xl font-semibold text-white">{user.name || user.login}</div>
                <div className="text-sm text-[#8b949e]">@{user.login}</div>
                {user.bio && <div className="mt-2 text-sm">{user.bio}</div>}
                <div className="mt-2 flex gap-4 text-xs text-[#8b949e]">
                  <span>Repos: {user.public_repos}</span>
                  <span>Followers: {user.followers}</span>
                  <span>Following: {user.following}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2 text-white">Recently updated repositories</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {repos.map((r) => (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-white/10 rounded p-3 bg-[#161b22] hover:bg-[#1f2630]"
                  >
                    <div className="text-sm font-semibold text-white">{r.name}</div>
                    {r.description && (
                      <div className="text-xs text-[#8b949e] mt-1 line-clamp-2">{r.description}</div>
                    )}
                    <div className="mt-2 text-xs text-[#8b949e] flex gap-3">
                      {r.language && <span>{r.language}</span>}
                      <span>★ {r.stargazers_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubWindow;


