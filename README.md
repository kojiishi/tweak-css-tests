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

1. Press the mouse button on this link: <a id="bookmarklet" href="javascript: (function(){var t={eval:'"!function(){function e(t){return\\"complete\\"!=t.readyState?void window.addEventListener(\\"load\\",function(){e(t)}):(o(t.querySelectorAll(\\"style\\"),function(e){var t=e.innerText,o=n(t);o!=t&&(e.innerHTML=o)}),void o([\\"iframe\\",\\"object\\"],function(n){o(t.querySelectorAll(n),function(n){var t=n.contentDocument;t&&e(t)})}))}function n(e){return e=t(e,\\"text-orientation\\"),e=t(e,\\"writing-mode\\"),e=e.replace(/(-webkit-){2,}/g,\\"-webkit-\\")}function t(e,n){return e.replace(new RegExp(n,\\"g\\"),\\"-webkit-\\"+n)}function o(e,n){for(var t=0;t<e.length;t++)n(e[t])}e(document)}();"'},e=!0;if("object"==typeof this.artoo&&(artoo.settings.reload||(artoo.log.verbose("artoo already exists within this page. No need to inject him again."),artoo.loadSettings(t),artoo.exec(),e=!1)),e){var n=document.getElementsByTagName("body")[0];n||(n=document.createElement("body"),document.documentElement.appendChild(n));var o=document.createElement("script");console.log("artoo.js is loading..."),o.src="//medialab.github.io/artoo/public/dist/artoo-latest.min.js",o.type="text/javascript",o.id="artoo_injected_script",o.setAttribute("settings",JSON.stringify(t)),n.appendChild(o)}}).call(this);">bookmarklet</a>.
2. Drag to your bookmarks bar.

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
