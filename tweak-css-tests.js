(function () {
    modifyStyles(document);

    function modifyStyles(doc) {
        var modify = getModify();
        if (!modify)
            return;

        if (doc.readyState != "complete") {
            doc.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        var isModified = false;
        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = modify(original);
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

    function getModify() {
        var style = document.body.style;
        if ('webkitWritingMode' in style)
            return modifyWebKit;
        if ('msTextCombineHorizontal' in style)
            return modifyIE;
        return null;
    }

    function modifyWebKit(text) {
        text = rename(text, "text-combine-(horizontal|upright)", "all", "-webkit-text-combine", "horizontal");
        text = renameProperty(text, "text-combine-(horizontal|upright)", "-webkit-text-combine");
        text = renameValue(text, "text-orientation", "mixed", "vertical-right");
        text = prefixProperty(text, "text-orientation");
        text = prefixValues(text, "unicode-bidi", ["isolate", "isolate-override", "plaintext"]);
        text = prefixProperty(text, "writing-mode");
        text = text.replace(/(-webkit-){2,}/g, "-webkit-");
        return text;
    }

    function modifyIE(text) {
        text = renameProperty(text, "text-combine-(horizontal|upright)", "-ms-text-combine-horizontal");
        text = renameValues(text, "writing-mode", [
            "horizontal-tb", "lr-tb",
            "vertical-rl", "tb-rl",
            "vertical-lr", "tb-lr"]);
        text = text.replace(/(-ms-){2,}/g, "-ms-");
        return text;
    }

    function prefixProperty(text, property) {
        return renameProperty(text, property, "-webkit-" + property);
    }

    function prefixValues(text, property, values) {
        forEach(values, function (value) {
            text = prefixValue(text, property, value);
        });
        return text;
    }

    function prefixValue(text, property, value) {
        return renameValue(text, property, value, "-webkit-" + value);
    }

    function renameProperty(text, property, to) {
        return text.replace(new RegExp(property, "g"), to);
    }

    function renameValues(text, property, values) {
        for (var i = 0; i < values.length; i += 2)
            text = renameValue(text, property, values[i], values[i+1]);
        return text;
    }

    function renameValue(text, property, value, to) {
        return rename(text, property, value, property, to);
    }

    function rename(text, property, value, propertyTo, valueTo) {
        return text.replace(new RegExp(property + "\\s*:\\s*" + value, "g"), propertyTo + ": " + valueTo);
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
