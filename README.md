Tweak CSS Tests
===============

A bookmarklet that helps you running the [CSS Test Suites]
on your browser.

## Overview

CSS syntax may change during the development of the specification.
The [CSS Test Suites] uses the most recent syntax,
but the browser you want to test on may support only old syntaxes.

This bookmarklet dynamically adopts test files for your browser.

## Install

1. Press the mouse button on this link: <a id="bookmarklet" href="javascript%3A%20%28function%28%29%7Bvar%20t%3D%7Beval%3A%27%22%21function%28%29%7Bfunction%20e%28t%29%7Breturn%5C%5C%22complete%5C%5C%22%21%3Dt.readyState%3Fvoid%20window.addEventListener%28%5C%5C%22load%5C%5C%22%2Cfunction%28%29%7Be%28t%29%7D%29%3A%28o%28t.querySelectorAll%28%5C%5C%22style%5C%5C%22%29%2Cfunction%28e%29%7Bvar%20t%3De.innerText%2Co%3Dn%28t%29%3Bo%21%3Dt%26%26%28e.innerHTML%3Do%29%7D%29%2Cvoid%20o%28%5B%5C%5C%22iframe%5C%5C%22%2C%5C%5C%22object%5C%5C%22%5D%2Cfunction%28n%29%7Bo%28t.querySelectorAll%28n%29%2Cfunction%28n%29%7Bvar%20t%3Dn.contentDocument%3Bt%26%26e%28t%29%7D%29%7D%29%29%7Dfunction%20n%28e%29%7Breturn%20e%3Dt%28e%2C%5C%5C%22text-orientation%5C%5C%22%29%2Ce%3Dt%28e%2C%5C%5C%22writing-mode%5C%5C%22%29%2Ce%3De.replace%28/%28-webkit-%29%7B2%2C%7D/g%2C%5C%5C%22-webkit-%5C%5C%22%29%7Dfunction%20t%28e%2Cn%29%7Breturn%20e.replace%28new%20RegExp%28n%2C%5C%5C%22g%5C%5C%22%29%2C%5C%5C%22-webkit-%5C%5C%22+n%29%7Dfunction%20o%28e%2Cn%29%7Bfor%28var%20t%3D0%3Bt%3Ce.length%3Bt++%29n%28e%5Bt%5D%29%7De%28document%29%7D%28%29%3B%22%27%7D%2Ce%3D%210%3Bif%28%22object%22%3D%3Dtypeof%20this.artoo%26%26%28artoo.settings.reload%7C%7C%28artoo.log.verbose%28%22artoo%20already%20exists%20within%20this%20page.%20No%20need%20to%20inject%20him%20again.%22%29%2Cartoo.loadSettings%28t%29%2Cartoo.exec%28%29%2Ce%3D%211%29%29%2Ce%29%7Bvar%20n%3Ddocument.getElementsByTagName%28%22body%22%29%5B0%5D%3Bn%7C%7C%28n%3Ddocument.createElement%28%22body%22%29%2Cdocument.documentElement.appendChild%28n%29%29%3Bvar%20o%3Ddocument.createElement%28%22script%22%29%3Bconsole.log%28%22artoo.js%20is%20loading...%22%29%2Co.src%3D%22//medialab.github.io/artoo/public/dist/artoo-latest.min.js%22%2Co.type%3D%22text/javascript%22%2Co.id%3D%22artoo_injected_script%22%2Co.setAttribute%28%22settings%22%2CJSON.stringify%28t%29%29%2Cn.appendChild%28o%29%7D%7D%29.call%28this%29%3B"!function(){function e(t){return\\"complete\\"!=t.readyState?void window.addEventListener(\\"load\\",function(){e(t)}):(o(t.querySelectorAll(\\"style\\"),function(e){var t=e.innerText,o=n(t);o!=t&&(e.innerHTML=o)}),void o([\\"iframe\\",\\"object\\"],function(n){o(t.querySelectorAll(n),function(n){var t=n.contentDocument;t&&e(t)})}))}function n(e){return e=t(e,\\"text-orientation\\"),e=t(e,\\"writing-mode\\"),e=e.replace(/(-webkit-){2,}/g,\\"-webkit-\\")}function t(e,n){return e.replace(new RegExp(n,\\"g\\"),\\"-webkit-\\"+n)}function o(e,n){for(var t=0;t<e.length;t++)n(e[t])}e(document)}();"'},e=!0;if("object"==typeof this.artoo&&(artoo.settings.reload||(artoo.log.verbose("artoo already exists within this page. No need to inject him again."),artoo.loadSettings(t),artoo.exec(),e=!1)),e){var n=document.getElementsByTagName("body")[0];n||(n=document.createElement("body"),document.documentElement.appendChild(n));var o=document.createElement("script");console.log("artoo.js is loading..."),o.src="//medialab.github.io/artoo/public/dist/artoo-latest.min.js",o.type="text/javascript",o.id="artoo_injected_script",o.setAttribute("settings",JSON.stringify(t)),n.appendChild(o)}}).call(this);">bookmarklet</a>.
2. Drag to your bookmarks bar.

<iframe src="https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/bookmarklet.js"></iframe>

## How to use the bookmarklet

1. Navigate to the test page in the [CSS Test Suites].
2. Click the bookmarklet on your bookmarks bar.

## Use the script directly

If you have the test files on your local hard drive,
you can load the script into the test page.
```html
<script src="tweak-css-tests.js"></script>
```
You can also load the script
directly from github
as in the example below.
```html
<script src="https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/tweak-css-tests.js"></script>
```

[CSS Test Suites]: http://test.csswg.org/shepherd/
