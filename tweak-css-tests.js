(function () {
    modifyStyles(document);

    function modifyStyles(doc) {
        if (doc.readyState != "complete") {
            window.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = modifyCssText(original);
            if (modified != original)
                style.innerHTML = modified;
        });

        for (var selector of ["iframe", "object"]) {
            forEach(doc.querySelectorAll(selector), function (element) {
                var doc = element.contentDocument;
                if (doc)
                    modifyStyles(doc);
            });
        }
    }

    function modifyCssText(text) {
        text = modifyPrefix(text, "writing-mode");
        text = text.replace(/(-webkit-){2,}/g, "-webkit-");
        return text;
    }

    function modifyPrefix(text, name) {
        return text.replace(new RegExp(name, "g"), "-webkit-" + name);
    }

    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }
})();
