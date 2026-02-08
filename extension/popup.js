document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const recentBlock = document.getElementById('recent-snippet');
    const recentTitle = document.getElementById('recent-snippet-title');
    const recentPreview = document.getElementById('recent-snippet-preview');

    // 1. Check if the server is alive
    try {
        const response = await fetch('https://snippet-two-rust.vercel.app/api/auth/get-session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            // Note: Chrome Extensions struggle with 'credentials: include' for localhost 
            // without complex permission setups. For MVP, we just check connectivity.
        });

        if (response.ok) {
            // Update UI to show we are connected
            const statusDot = document.querySelector('.status-dot');
            if (statusDot) {
                statusDot.style.backgroundColor = '#22c55e'; // Green
                statusDot.title = "Connected to Localhost";
            }
        } else {
            throw new Error("Server error");
        }

    } catch (error) {
        // Offline / Error State
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.style.backgroundColor = '#ef4444'; // Red
            statusDot.title = "Cannot connect to server";
        }
        contentDiv.innerHTML = `
            <div class="empty-state">
                <p style="color: #ef4444;">Server Disconnected</p>
                <p style="font-size: 11px;">Is 'npm run dev' running?</p>
            </div>
        `;
    }

    // 2. Fetch most recent snippet from dashboard (when user has session)
    try {
        const res = await fetch('https://snippet-two-rust.vercel.app/api/snippet', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.snippet && recentBlock && recentTitle && recentPreview) {
                recentTitle.textContent = data.snippet.title || 'Untitled';
                const code = (data.snippet.code || '').trim();
                recentPreview.textContent = code.length > 200 ? code.slice(0, 200) + '…' : code;
                recentBlock.classList.add('visible');
            }
        }
    } catch (_) {
        // No recent snippet or not logged in – keep recent block hidden
    }
});