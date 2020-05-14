/* To consoloe log within the app:
* chrome.extension.getBackgroundPage().console.log('foo');
*/
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background', request, sender, sendResponse)
})
