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

1. Press the mouse button on the link below.
2. Drag to your bookmarks bar and release the mouse button.

<iframe src="https://raw.githubusercontent.com/kojiishi/tweak-css-tests/master/bookmarklet.html"></iframe>

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
