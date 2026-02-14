/**
 * Extracts only code from snippet content (markdown with optional ``` code blocks).
 * Returns pure code: either the first code block, or all code blocks joined; if none, returns trimmed content.
 */
function getCodeOnly(raw) {
    if (!raw || !String(raw).trim()) return '';
    const str = String(raw).trim();
    const fenceRe = /```\w*\s*\n([\s\S]*?)```/g;
    const blocks = [];
    let match;
    while ((match = fenceRe.exec(str)) !== null) {
        blocks.push(match[1].trim());
    }
    if (blocks.length > 0) return blocks.join('\n\n');
    return str;
}

document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const recentBlock = document.getElementById('recent-snippet');
    const recentTitle = document.getElementById('recent-snippet-title');
    const recentPreview = document.getElementById('recent-snippet-preview');

    const statusSpan = document.getElementById('connection-status');
    const dashboardBtn = document.getElementById('dashboard-btn');

    // 1. Check if the server is alive
    try {
        const response = await fetch('https://saveto-snippet.vercel.app/api/auth/get-session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();

            // Check if we actually have a session
            if (data && (data.session || data.user)) {
                // Update UI to show we are connected
                if (statusSpan) {
                    statusSpan.textContent = 'Online';
                    statusSpan.style.color = '#22c55e'; // Green
                    statusSpan.title = "Connected";
                }
                if (dashboardBtn) {
                    dashboardBtn.textContent = "Open Dashboard";
                }
            } else {
                // Response OK but no session data -> Not signed in
                throw new Error("No active session");
            }
        } else {
            throw new Error("Server error");
        }

    } catch (error) {
        // Offline / Error State
        if (statusSpan) {
            statusSpan.textContent = 'Offline';
            statusSpan.style.color = '#ef4444'; // Red
            statusSpan.title = "Cannot connect or not signed in";
        }
        if (dashboardBtn) {
            dashboardBtn.textContent = "Sign in to save snippets";
        }
        contentDiv.innerHTML = `
            <div class="empty-state">
                <p style="color: #ef4444;">Disconnected</p>
                <p style="font-size: 11px;">Please sign in via dashboard</p>
            </div>
        `;
    }

    // 2. Fetch most recent snippet from dashboard (when user has session)
    if (recentBlock) {
        recentBlock.classList.add('visible', 'loading');
    }
    try {
        const res = await fetch('https://saveto-snippet.vercel.app/api/snippet', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.snippet && recentBlock && recentTitle && recentPreview) {
                recentTitle.textContent = data.snippet.title || 'Untitled';
                const code = getCodeOnly(data.snippet.code || '');
                recentPreview.textContent = code.length > 250 ? code.slice(0, 250) + '…' : code;
                recentBlock.classList.remove('loading');
            } else {
                recentBlock.classList.remove('visible', 'loading');
            }
        } else {
            recentBlock.classList.remove('visible', 'loading');
        }
    } catch (_) {
        if (recentBlock) recentBlock.classList.remove('visible', 'loading');
    }
});