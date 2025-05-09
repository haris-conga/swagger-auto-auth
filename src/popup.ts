chrome.storage.local.get("bearerToken", ({ bearerToken }) => {
  const el = document.getElementById("tokenDisplay");
  if (el) el.textContent = bearerToken || "No token found";
});