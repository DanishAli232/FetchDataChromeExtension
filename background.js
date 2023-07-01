chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (
    tab.url &&
    (tab.url.includes("aliexpress.com") || tab.url.includes("amazon.com"))
  ) {
    const queryParameters = tab.url.split("?")[1];
    console.log(queryParameters);
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("sbo"),
    });
  }
});
