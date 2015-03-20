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

1. Navigate to the [bookmarklet].
2. Select all text in the page.
3. Drag the selected text to your bookmarks bar.

## How to use

1. Navigate to the test page in the [CSS Test Suites].
2. Click the bookmarklet on your bookmarks bar.

## Use as a script

If you have test files locally,
you can load into the test page:
```html
<script src="tweak-css-tests.js"></script>
```
You can also load the script
directly from github:
```html
<script src="https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/tweak-css-tests.js"></script>
```

[CSS Test Suites]: http://test.csswg.org/shepherd/
[bookmarklet]: https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/bookmarklet.js
