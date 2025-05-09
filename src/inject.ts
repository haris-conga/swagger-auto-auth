console.log("Injecting token into Swagger UI...");

chrome.storage.local.get("bearerToken", ({ bearerToken }) => {
  if (!bearerToken) return;

  const buttons = document.querySelectorAll("button");
  const authorizeButton = Array.from(buttons).find(btn => btn.textContent?.includes("Authorize"));

  if (authorizeButton) {
    authorizeButton.click();

    setTimeout(() => {
      const input = document.querySelector("input[type='text']") as HTMLInputElement;
      if (input) {
        input.value = bearerToken;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        const modalButtons = document.querySelectorAll("button");
        const applyBtn = Array.from(modalButtons).find(btn => btn.textContent?.includes("Authorize"));
        applyBtn?.click();
      }
    }, 1000);
  }
});