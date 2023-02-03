// // Handle requests for passwords
// chrome.runtime.onMessage.addListener(function(request) {
//     if (request.type === 'request_password') {
//         chrome.tabs.create({
//             url: chrome.extension.getURL('dialog.html'),
//             active: false
//         }, function(tab) {
//             // After the tab has been created, open a window to inject the tab
//             chrome.windows.create({
//                 tabId: tab.id,
//                 type: 'popup',
//                 focused: true
//                 // incognito, top, left, ...
//             });
//         });
//     }
// });
// function setPassword(password) {
//     // Do something, eg..:
//     console.log(password);
// };

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
      type:"popup",
      width:400,
      height:600,
      url: chrome.runtime.getURL("index.html")
    });
  });