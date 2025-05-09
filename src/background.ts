
const configuredUrl = "https://rls-dev.congacloud.io/clm/";

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension clicked");

  const isSwagger = tab?.url?.includes("swagger");

  if (!isSwagger) {
    chrome.storage.local.set({ bearerToken: "Not on Swagger UI tab." });
    return;
  }

  const handler = (details: chrome.webRequest.WebRequestHeadersDetails) => {
    const auth = details.requestHeaders?.find((h) => h.name.toLowerCase() === "authorization");
    if (auth?.value) {
      console.log("Token found:", auth.value);
      chrome.storage.local.set({ bearerToken: auth.value });

      chrome.webRequest.onBeforeSendHeaders.removeListener(handler);

      if (details.tabId !== -1) chrome.tabs.remove(details.tabId);

      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ["inject.js"]
      });
    }
  };

  chrome.webRequest.onBeforeSendHeaders.addListener(handler, { urls: ["<all_urls>"] }, ["requestHeaders"]);

  const tabs = await chrome.tabs.query({});
  const existing = tabs.find((t) => t.url?.startsWith(configuredUrl));
  if (existing) {
    console.log("Reloading existing tab to trigger auth header");
    chrome.tabs.reload(existing.id!);
  } else {
    console.log("Opening configured URL tab");
    chrome.tabs.create({ url: configuredUrl, active: false });
  }

  setTimeout(() => {
    chrome.storage.local.get("bearerToken", ({ bearerToken }) => {
      if (!bearerToken) {
        console.warn("Token not found after timeout");
        chrome.webRequest.onBeforeSendHeaders.removeListener(handler);
      }
    });
  }, 5000);
});