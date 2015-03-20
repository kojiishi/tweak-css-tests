(function () {
    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }

    function modifyStyles() {
        forEach(document.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            var modified = original
                .replace(/writing-mode/g, "-webkit-writing-mode")
                .replace(/-webkit-webkit-writing-mode/g, "-webkit-writing-mode");
            if (modified != original)
                style.innerText = modified;
        });
    }

    if (document.readyState != "complete")
        window.addEventListener("load", modifyStyles);
    else
        modifyStyles();
})();
