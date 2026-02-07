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

    try {
      // 3. Send to your Next.js Backend
        const response = await fetch('https://snippet-two-rust.vercel.app/api/snippet', {
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
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Snippet Saved!",
          message: "Your code snippet has been saved to SnippetVault."
        });
      } else {
        console.error("ERROR: Failed to save.", await response.text());
      }

    } catch (err) {
      console.error("NETWORK ERROR:", err);
    }
  }
});