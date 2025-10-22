// Centralized API helper for constructing backend REST endpoints
// Expects environment variable REACT_APP_CODESPACE_NAME to be set in Codespaces.
// Fallback attempts to infer from window.location.

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

// GitHub Codespaces expose forwarded port 8000 via https protocol.
function inferCodespaceName() {
  try {
    const host = window.location.host; // e.g. myspace-3000.app.github.dev
    const match = host.match(/^(.*?)-\d+\.app\.github\.dev$/);
    if (match) return match[1];
  } catch (e) {
    // noop
  }
  return undefined;
}

const resolvedCodespace = codespaceName || inferCodespaceName();
if (!resolvedCodespace) {
  // eslint-disable-next-line no-console
  console.warn('[api] Unable to resolve REACT_APP_CODESPACE_NAME; API calls may fail.');
}

export const API_BASE = resolvedCodespace
  ? `https://${resolvedCodespace}-8000.app.github.dev/api`
  : '/api'; // Fallback (useful for local proxy setups)

// Build a resource endpoint (ensures trailing slash)
export function endpoint(resource) {
  const ep = `${API_BASE}/${resource.replace(/\/+$/,'')}/`;
  // eslint-disable-next-line no-console
  console.log('[api] endpoint resolved:', ep);
  return ep;
}

// Generic fetch wrapper with pagination-compatible normalization
export async function fetchResource(resource, options = {}) {
  const url = endpoint(resource);
  try {
    const resp = await fetch(url, options);
    const data = await resp.json().catch(() => null);
    const list = Array.isArray(data) ? data : (data && Array.isArray(data.results) ? data.results : []);
    // eslint-disable-next-line no-console
    console.log(`[api] fetched ${resource}:`, { raw: data, normalized: list });
    return { raw: data, list, url };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[api] error fetching ${resource}:`, error);
    return { raw: null, list: [], url, error };
  }
}
