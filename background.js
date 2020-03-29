/**********

CopyPaste of webextensions-examples\menu-labelled-open

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs
"You can't directly access the content hosted by tabs using this API, but you can insert JavaScript"

*****/

const openLabelledId = "open-bigig";
const title = "Big Instagram";
const iglink = RegExp("https://www.instagram.com/p/*/");

// TODO create only over "https://www.instagram.com/*/""
browser.menus.create({
  id: openLabelledId,
  title: title,
  contexts: ["link"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
//  browser.tabs.create({url: info.linkUrl + "media/?size=l" });
//  browser.tabs.update({url: info.linkUrl + "media/?size=l" });
//  let executing = browser.tabs.executeScript ({file: "content.js"})
    let code =
        "var ediv = document.createElement('div');"
      + "ediv.style.cssText = 'overflow:auto;position:fixed;top:0;left:0;width:100%;height:100%;opacity:1.0;z-index:1;';"
      + "document.body.insertBefore(ediv, document.body.firstChild);"
      + "var img = document.createElement('img');"
      + "img.src = '" + info.linkUrl + "media/?size=l';"
      + "img.style.cssText = 'display:block;margin:6px auto 6px;';"
      + "img.onclick = function() { ediv.remove(); };"
      + "ediv.appendChild(img);"
      + "img.scrollIntoView();";
      let executing = browser.tabs.executeScript ({code: code}); 
//    executing.then(onExecuted, onError);
    }
});

//function onExecuted(result) { console.log("done"); }
//function onError(error) { console.log(`Error: ${error}`); }

function updateMenuItem(linkElement) {
  browser.menus.update(openLabelledId, { title: `Big Ig (${linkElement.href})` });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  /* info.linkUrl
   * info.pageUrl    : www.instagram.com/<user>/
   * info.linkText   : lengthy
   */
  if (!info.linkUrl || !iglink.test(info.linkUrl)) {
    browser.menus.update(openLabelledId, { title: title });
    browser.menus.refresh();
  } else {
    let linkElement = document.createElement("a");
    linkElement.href = info.linkUrl;
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

****/