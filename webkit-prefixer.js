(function () {
    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }

    function modifyStyles(doc) {
        if (doc.readyState != "complete") {
            window.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = original
                .replace(/writing-mode/g, "-webkit-writing-mode")
                .replace(/-webkit-webkit-writing-mode/g, "-webkit-writing-mode");
            if (modified != original)
                style.innerText = modified;
        });

        for (var selector of ["iframe", "object"]) {
            forEach(doc.querySelectorAll(selector), function (element) {
                var doc = element.contentDocument;
                if (doc)
                    modifyStyles(doc);
            });
        }
    }

    modifyStyles(document);
})();
