# my-robinhood-extension

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run client
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Chrome Install
```
After running either `npm run client` or `npm run build`
Go to chrome://extensions/
Turn on developers mode
Click Load Unpacked 
Select the dist folder in the my-stock-watcher application

Once loaded, it will remain until it is removed or developer mode is turned off. 

For development, npm run client will auto rebuild the application and the changes will be present promptly.

Occasionally there are issues with the auto rebuild, and you will be required to re-load the dist file in the chrome://extensions/. This usually occurs when changes are made to the manifest.
```

### Note
Local storage is used to store a string list of all the stocks you have in your portfolio. This is the only item that is stored in local storage.

As of this update, I have only tested this extension on Google Chrome. However, it should work on Firefox as well.

It will probably work on Microsoft Edge considering Edge is build on Chromium.

As for Internet Explorer ... well, if you are still using internet explorer, I'm sorry. 😅

### Q&A
If you have questions, issues, or suggestions feel free to open a new issue and I will respond as soon as I can.

### Chrome Web Store
I plan to release this in the Chrome Web Store. I am waiting on approval and will post the link here and in the description once it is available there. 

### Disclaimer
The API used to get the stock information only provides updated information during market hours; and may not be as real time as professional tools used by stock brokers. 

Though, from my experience with it, the information is very accurate.
