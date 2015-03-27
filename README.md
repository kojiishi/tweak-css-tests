Tweak CSS Tests
===============

A bookmarklet that helps you running the [CSS Test Suites]
on your browser.

## Overview

CSS syntax may change during the development of the specifications.
The [CSS Test Suites] uses the most recent syntax,
but the browser you want to test may support only old syntaxes.

This bookmarklet dynamically modifies the DOM for your browser,
so that you can test layout and/or behavior
before the browser adopts to the new syntax.

Supports [CSS Writing Modes Level 3] for Chrome/Safari.

## Install

1. Navigate to [bookmarklet].
2. Select all text in the page.
3. Drag the selected text to your bookmarks bar.

If that fails, please refer to [how to install bookmarklet in Chrome].

## How to use the bookmarklet

1. Navigate to the test page in the [CSS Test Suites].
2. Click the bookmarklet on your bookmarks bar.

## Use the script directly

If you have the test files on your local hard drive,
you can load the script into the test page
by adding a script tag to the test page.
```html
<script src="tweak-css-tests.js"></script>
```

[CSS Test Suites]: http://test.csswg.org/shepherd/
[CSS Writing Modes Level 3]: http://dev.w3.org/csswg/css-writing-modes-3/
[how to install bookmarklet in Chrome]: https://crossbrowsertesting.com/faq/how-do-i-install-bookmarklet-google-chrome-mac-os
[bookmarklet]: https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/bookmarklets/tweak-css-tests.js
