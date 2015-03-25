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
        text = modifyValueRename(text, "text-orientation", "mixed", "vertical-right");
        text = modifyPrefix(text, "text-orientation");
        text = modifyPrefix(text, "writing-mode");
        text = modifyValueRename(text, "text-combine-upright", "all", "horizontal");
        text = modifyPropertyRename(text, "text-combine-upright", "-webkit-text-combine");
        text = text.replace(/(-webkit-){2,}/g, "-webkit-");
        return text;
    }

    function modifyPropertyRename(text, from, to) {
        return text.replace(new RegExp(from, "g"), to);
    }

    function modifyValueRename(text, property, from, to) {
        return text.replace(new RegExp(property + "\\s*:\\s*" + from, "g"), property + ": " + to);
    }

    function modifyPrefix(text, name) {
        return text.replace(new RegExp(name, "g"), "-webkit-" + name);
    }

    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }
})();
