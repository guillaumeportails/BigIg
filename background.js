/**********

CopyPaste of webextensions-examples\menu-labelled-open

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs
"You can't directly access the content hosted by tabs using this API, but you can insert JavaScript"

*****/

const openLabelledId = "open-bigig";
const iglink = RegExp("https://www.instagram.com/p/*/");

// TODO create only over "https://www.instagram.com/*/""
browser.menus.create({
  id: openLabelledId,
  title: "Big Instagram",
  contexts: ["link"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
//  browser.tabs.create({url: info.linkUrl + "media/?size=l" });
    browser.tabs.update({url: info.linkUrl + "media/?size=l" });
    // TODO change the DOM : add an overlay
  }
});

function updateMenuItem(linkElement) {
  browser.menus.update(openLabelledId, {
    title: `Big Ig (${linkElement.href})`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  console.log(info);
  /* info.linkUrl
   * info.pageUrl    : www.instagram.com/<user>/
   * info.linkText   : lengthy
   */
  if (!info.linkUrl || !iglink.test(info.linkUrl)) {
    browser.menus.update(openLabelledId, { title: "Big Instagram" });
    browser.menus.refresh();
  } else {
    let linkElement = document.createElement("a");
    linkElement.href = info.linkUrl;
    console.log(linkElement);
    updateMenuItem(linkElement);
  }
});

/*************

function onLoad() {
  if (browser.tabs.url ~instagram) {}
browser.menus.create({
  id: openLabelledId,
  title: "Big Instagram",
  contexts: ["link"]
});
}

document.addEventListener("load", onLoad);


 */