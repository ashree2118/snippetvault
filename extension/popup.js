document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    
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
            statusDot.style.backgroundColor = '#22c55e'; // Green
            statusDot.title = "Connected to Localhost";
        } else {
            throw new Error("Server error");
        }

    } catch (error) {
        // Offline / Error State
        const statusDot = document.querySelector('.status-dot');
        statusDot.style.backgroundColor = '#ef4444'; // Red
        statusDot.title = "Cannot connect to server";
        
        contentDiv.innerHTML = `
            <div class="empty-state">
                <p style="color: #ef4444;">Server Disconnected</p>
                <p style="font-size: 11px;">Is 'npm run dev' running?</p>
            </div>
        `;
    }
});