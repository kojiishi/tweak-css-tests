(function () {
    modifyStyles(document);

    function modifyStyles(doc) {
        if (doc.readyState != "complete") {
            doc.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = modifyCssText(original);
            if (modified != original)
                style.innerHTML = modified;
        });

        forEach(["iframe", "object"], function (selector) {
            forEach(doc.querySelectorAll(selector), function (element) {
                var doc = element.contentDocument;
                if (doc)
                    modifyStyles(doc);
            });
        });
    }

    function modifyCssText(text) {
        text = modifyValueRename(text, "text-combine-upright", "all", "horizontal");
        text = modifyPropertyRename(text, "text-combine-upright", "-webkit-text-combine");
        text = modifyValueRename(text, "text-orientation", "mixed", "vertical-right");
        text = modifyPropertyPrefix(text, "text-orientation");
        text = modifyValuePrefix(text, "unicode-bidi", "isolate");
        text = modifyValuePrefix(text, "unicode-bidi", "isolate-override");
        text = modifyValuePrefix(text, "unicode-bidi", "plaintext");
        text = modifyPropertyPrefix(text, "writing-mode");
        text = text.replace(/(-webkit-){2,}/g, "-webkit-");
        return text;
    }

    function modifyPropertyPrefix(text, property) {
        return modifyPropertyRename(text, property, "-webkit-" + property);
    }

    function modifyPropertyRename(text, property, to) {
        return text.replace(new RegExp(property, "g"), to);
    }

    function modifyValuePrefix(text, property, value) {
        return modifyValueRename(text, property, value, "-webkit-" + value);
    }


    function modifyValueRename(text, property, value, to) {
        return text.replace(new RegExp(property + "\\s*:\\s*" + value, "g"), property + ": " + to);
    }

    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }
})();
