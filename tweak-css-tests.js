(function () {
    function Tweaker () {
    }
    var proto = Tweaker.prototype;

    function modifyStyles(doc) {
        if (doc.readyState != "complete") {
            doc.addEventListener("load", function () { modifyStyles(doc); });
            return;
        }

        var tweaker = new Tweaker();
        var isModified = false;
        forEach(doc.querySelectorAll("style"), function (style) {
            var original = style.innerText;
            tweaker.text = original;
            tweaker.tweak();
            if (tweaker.text == original)
                return;
            style.innerHTML = tweaker.text;
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

    var style = document.body.style;
    if ('webkitWritingMode' in style) {
        proto.prefix = "-webkit-";
        proto.tweak = function tweakWebKit() {
            this.rename("text-combine-(horizontal|upright)", "all", "-webkit-text-combine", "horizontal");
            this.renameProperty("text-combine-(horizontal|upright)", "-webkit-text-combine");
            this.renameValue("text-orientation", "mixed", "vertical-right");
            this.prefixProperty("text-orientation", "writing-mode");
            this.prefixValue("unicode-bidi", "isolate", "isolate-override", "plaintext");
            this.replace(/(-webkit-){2,}/g, "-webkit-");
        };
    } else if ('msTextCombineHorizontal' in style) {
        proto.tweak = function tweakIE() {
            this.renameProperty("text-combine-(horizontal|upright)", "-ms-text-combine-horizontal");
            this.renameValue("writing-mode",
                "horizontal-tb", "lr-tb",
                "vertical-rl", "tb-rl",
                "vertical-lr", "tb-lr");
            this.replace(/(-ms-){2,}/g, "-ms-");
        };
    } else {
        throw new Exception("Unsupported browser");
    }

    proto.prefixProperty = function (property) {
        for (var i = 0; i < arguments.length; i++) {
            property = arguments[i];
            this.renameProperty(property, this.prefix + property);
        }
    }

    proto.prefixValue = function (property, value) {
        for (var i = 1; i < arguments.length; i++) {
            value = arguments[i];
            this.renameValue(property, value, this.prefix + value);
        }
    }

    proto.renameProperty = function (property, to) {
        this.rename(property, "", to, "");
    }

    proto.renameValue = function (property, value, to) {
        for (var i = 1; i < arguments.length; i += 2)
            this.rename(property, arguments[i], property, arguments[i+1]);
    }

    proto.rename = function (property, value, propertyTo, valueTo) {
        this.replace(new RegExp(property + "\\s*:\\s*" + value, "g"), propertyTo + ": " + valueTo);
    }

    proto.replace = function (from, to) {
        this.text = this.text.replace(from, to);
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

    modifyStyles(document);
})();
