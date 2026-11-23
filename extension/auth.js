// Shared auth helpers for the background service worker and the popup.
//
// Instead of relying on the browser's session cookie being attached to every
// request (it can expire, get cleared, or be blocked), we copy the session
// token into chrome.storage.local once the user signs in on the website and
// send it as `Authorization: Bearer <token>`. The server uses a sliding
// 90-day session, so as long as the extension is used, the token stays valid.

const API_BASE = 'https://snippet.anushreesh.com';
const TOKEN_KEY = 'snippetAuthToken';
// better-auth uses the __Secure- prefix on HTTPS; the plain name is a fallback.
const SESSION_COOKIE_NAMES = [
    '__Secure-better-auth.session_token',
    'better-auth.session_token',
];

async function getStoredToken() {
    const result = await chrome.storage.local.get(TOKEN_KEY);
    return result[TOKEN_KEY] || null;
}

async function setStoredToken(token) {
    if (token) await chrome.storage.local.set({ [TOKEN_KEY]: token });
}

async function clearStoredToken() {
    await chrome.storage.local.remove(TOKEN_KEY);
}

async function readSessionCookie() {
    for (const name of SESSION_COOKIE_NAMES) {
        try {
            const cookie = await chrome.cookies.get({ url: API_BASE, name });
            if (cookie && cookie.value) return cookie.value;
        } catch (_) {
            // ignore and try the next name
        }
    }
    return null;
}

function isSessionCookie(cookie) {
    return SESSION_COOKIE_NAMES.includes(cookie.name) &&
        'snippet.anushreesh.com'.endsWith(cookie.domain.replace(/^\./, ''));
}

function sendRequest(path, options, token) {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
        // With a bearer token, don't also send cookies (two session tokens in
        // one request would conflict). Without one, fall back to the cookie.
        credentials: token ? 'omit' : 'include',
    });
}

/**
 * fetch() wrapper that authenticates with the stored token, picks up a fresh
 * token from the website's cookie when needed, and clears it when it's dead.
 */
async function authFetch(path, options = {}) {
    let token = await getStoredToken();
    if (!token) {
        token = await readSessionCookie();
        await setStoredToken(token);
    }

    let response = await sendRequest(path, options, token);

    if (response.status === 401) {
        // Stored token may be stale (e.g. user signed out and back in). Try the
        // current website cookie before giving up.
        const fresh = await readSessionCookie();
        if (fresh && fresh !== token) {
            await setStoredToken(fresh);
            response = await sendRequest(path, options, fresh);
        }
        if (response.status === 401) await clearStoredToken();
    }

    // The server may hand back a rotated token.
    const rotated = response.headers.get('set-auth-token');
    if (rotated) await setStoredToken(rotated);

    return response;
}
