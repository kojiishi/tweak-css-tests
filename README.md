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

1. Press the mouse button on this link: [bookmarklet].
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
[bookmarklet]: javascript:%20(function()%7Bvar%20t=%7Beval:'%22!function()%7Bfunction%20e(t)%7Breturn%5C%5C%22complete%5C%5C%22!=t.readyState?void%20window.addEventListener(%5C%5C%22load%5C%5C%22,function()%7Be(t)%7D):(o(t.querySelectorAll(%5C%5C%22style%5C%5C%22),function(e)%7Bvar%20t=e.innerText,o=n(t);o!=t&&(e.innerHTML=o)%7D),void%20o(%5B%5C%5C%22iframe%5C%5C%22,%5C%5C%22object%5C%5C%22%5D,function(n)%7Bo(t.querySelectorAll(n),function(n)%7Bvar%20t=n.contentDocument;t&&e(t)%7D)%7D))%7Dfunction%20n(e)%7Breturn%20e=t(e,%5C%5C%22text-orientation%5C%5C%22),e=t(e,%5C%5C%22writing-mode%5C%5C%22),e=e.replace(/(-webkit-)%7B2,%7D/g,%5C%5C%22-webkit-%5C%5C%22)%7Dfunction%20t(e,n)%7Breturn%20e.replace(new%20RegExp(n,%5C%5C%22g%5C%5C%22),%5C%5C%22-webkit-%5C%5C%22+n)%7Dfunction%20o(e,n)%7Bfor(var%20t=0;t%3Ce.length;t++)n(e%5Bt%5D)%7De(document)%7D();%22'%7D,e=!0;if(%22object%22==typeof%20this.artoo&&(artoo.settings.reload%7C%7C(artoo.log.verbose(%22artoo%20already%20exists%20within%20this%20page.%20No%20need%20to%20inject%20him%20again.%22),artoo.loadSettings(t),artoo.exec(),e=!1)),e)%7Bvar%20n=document.getElementsByTagName(%22body%22)%5B0%5D;n%7C%7C(n=document.createElement(%22body%22),document.documentElement.appendChild(n));var%20o=document.createElement(%22script%22);console.log(%22artoo.js%20is%20loading...%22),o.src=%22//medialab.github.io/artoo/public/dist/artoo-latest.min.js%22,o.type=%22text/javascript%22,o.id=%22artoo_injected_script%22,o.setAttribute(%22settings%22,JSON.stringify(t)),n.appendChild(o)%7D%7D).call(this);
