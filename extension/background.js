// 1. Create the Context Menu Item when extension installs
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-snippet",
    title: "Save to Snippet",
    contexts: ["selection"]
  });
});

// 2. Listen for the Click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "save-snippet") {

    const codeSnippet = info.selectionText;
    const pageUrl = tab.url;

    console.log("Sending to Vault:", codeSnippet);


    // Helper to inject a toaster into the page
    function showToaster(tabId, type, title, message) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (type, title, message) => {
          const existing = document.getElementById('snippet-toaster');
          if (existing) existing.remove();

          const toast = document.createElement('div');
          toast.id = 'snippet-toaster';
          toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: #0a0a0a;
            border: 1px solid #333;
            color: #fff;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 999999;
            font-family: -apple-system, system-ui, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 250px;
            opacity: 0;
            transition: all 0.3s ease;
          `;

          // Icon handling
          const icon = document.createElement('div');
          icon.style.cssText = `
            width: 20px; 
            height: 20px; 
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
          `;

          if (type === 'success') {
            icon.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
            icon.style.color = '#22c55e';
            icon.innerHTML = '✓';
          } else {
            icon.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            icon.style.color = '#ef4444';
            icon.innerHTML = '!';
          }

          const text = document.createElement('div');
          text.innerHTML = `<div style="font-weight: 600; font-size: 13px; margin-bottom: 2px;">${title}</div><div style="font-size: 12px; color: #888;">${message}</div>`;

          toast.appendChild(icon);
          toast.appendChild(text);
          document.body.appendChild(toast);

          // Animate in
          requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
          });

          // Remove after 3s
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
          }, 3000);
        },
        args: [type, title, message]
      });
    }

    try {
      // 3. Send to your Next.js Backend
      const response = await fetch('https://saveto-snippet.vercel.app/api/snippet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: codeSnippet,
          sourceUrl: pageUrl
        })
      });

      if (response.ok) {
        console.log("SUCCESS: Snippet saved!");
        showToaster(tab.id, 'success', 'Snippet Saved!', 'Your code snippet has been saved to SnippetVault.');
      } else if (response.status === 401 || response.status === 403) {
        console.log("ERROR: Unauthorized.");
        showToaster(tab.id, 'error', 'Not Signed In to Dashboard', 'Please sign in to your dashboard first.');
      } else {
        console.error("ERROR: Failed to save.", await response.text());
        showToaster(tab.id, 'error', 'Error', 'Failed to save snippet.');
      }
    } catch (err) {
      console.error("NETWORK ERROR:", err);
      showToaster(tab.id, 'error', 'Network Error', 'Could not reach server.');
    }
  }
});