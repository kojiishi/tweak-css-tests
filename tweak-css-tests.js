(function () {
    modifyStyles(document);

    function modifyStyles(doc) {
        if (doc.readyState != "complete") {
            doc.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        var isModified = false;
        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = modifyCssText(original);
            if (modified == original)
                return;
            style.innerHTML = modified;
            isModified = true;
        });

        forEach(["iframe", "object"], function (selector) {
            forEach(doc.querySelectorAll(selector), function (element) {
                var subdoc = element.contentDocument;
                if (subdoc)
                    modifyStyles(subdoc);
            });
        });

        // WebKit/Blink has a bug in table layout when writing-mode was changed.
        // Force a full layout to work around this issue.
        if (isModified)
            recalc(doc.body);
    }

    function modifyCssText(text) {
        text = renameValue(text, "text-combine-upright", "all", "horizontal");
        text = renameProperty(text, "text-combine-upright", "-webkit-text-combine");
        text = renameValue(text, "text-orientation", "mixed", "vertical-right");
        text = prefixProperty(text, "text-orientation");
        text = prefixValue(text, "unicode-bidi", "isolate");
        text = prefixValue(text, "unicode-bidi", "isolate-override");
        text = prefixValue(text, "unicode-bidi", "plaintext");
        text = prefixProperty(text, "writing-mode");
        text = text.replace(/(-webkit-){2,}/g, "-webkit-");
        return text;
    }

    function prefixProperty(text, property) {
        return renameProperty(text, property, "-webkit-" + property);
    }

    function renameProperty(text, property, to) {
        return text.replace(new RegExp(property, "g"), to);
    }

    function prefixValue(text, property, value) {
        return renameValue(text, property, value, "-webkit-" + value);
    }

    function renameValue(text, property, value, to) {
        return text.replace(new RegExp(property + "\\s*:\\s*" + value, "g"), property + ": " + to);
    }

    function recalc(element) {
        var saved = element.style.display;
        element.style.display = "none";
        element.offsetTop;
        element.style.display = saved;
    }

    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }
})();
