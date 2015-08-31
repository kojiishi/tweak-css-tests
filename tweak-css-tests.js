(function () {
    function Tweaker () {}
    extend(Tweaker.prototype, {
        tweakDocument: function (doc) {
            var me = this;
            if (doc.readyState != "complete") {
                doc.addEventListener("load", function () { me.tweakDocument(doc); });
                return;
            }

            ["iframe", "object"].forEach(function (selector) {
                forEach(doc.querySelectorAll(selector), function (element) {
                    var subdoc = element.contentDocument;
                    if (subdoc)
                        me.tweakDocument(subdoc);
                });
            });

            var isModified = false;
            forEach(doc.querySelectorAll("style"), function (style) {
                isModified |= me.tweakStyleElement(style);
            });

            if (isModified)
                me.onTweakDocumentCompleted(doc);
        },
        tweakStyleElement: function (style) {
            var old = this.text = style.innerText;
            this.tweakPlatform();
            if (this.text == old)
                return false;
            style.innerHTML = this.text;
            return true;
        },
        onTweakDocumentCompleted: function () {},
        prefixProperty: function (property) {
            for (var i = 0; i < arguments.length; i++) {
                property = arguments[i];
                this.renameProperty(property, this.prefix + property);
            }
        },
        prefixValue: function (property, value) {
            for (var i = 1; i < arguments.length; i++) {
                value = arguments[i];
                this.renameValue(property, value, this.prefix + value);
            }
        },
        renameProperty: function (property, to) {
            this.rename(property, "", to, "");
        },
        renameValue: function (property, value, to) {
            for (var i = 1; i < arguments.length; i += 2)
                this.rename(property, arguments[i], property, arguments[i+1]);
        },
        rename: function (property, value, propertyTo, valueTo) {
            this.replace(new RegExp(property + "\\s*:\\s*" + value, "g"), propertyTo + ": " + valueTo);
        },
        replace: function (from, to) {
            this.text = this.text.replace(from, to);
        }
    });

    var style = document.body.style;
    if ('webkitWritingMode' in style) {
        extend(Tweaker.prototype, {
            prefix: "-webkit-",
            tweakPlatform: function tweakWebKit() {
                this.rename("text-combine-(horizontal|upright)", "all", "-webkit-text-combine", "horizontal");
                this.renameProperty("text-combine-(horizontal|upright)", "-webkit-text-combine");
                this.renameValue("text-orientation", "mixed", "vertical-right");
                this.prefixProperty("text-orientation", "writing-mode");
                this.prefixValue("unicode-bidi", "isolate", "isolate-override", "plaintext");
                this.replace(/(-webkit-){2,}/g, "-webkit-");
            },
            onTweakDocumentCompleted: function (doc) {
                // WebKit/Blink has a bug in table layout when writing-mode was changed.
                // Force a full layout to work around this issue.
                recalc(doc.body);
            }
        });
    } else if (window.CSS && CSS.supports && CSS.supports("unicode-bidi", "-moz-isolate")) {
        extend(Tweaker.prototype, {
            prefix: "-moz-",
            tweakPlatform: function tweakMozilla() {
                this.prefixValue("unicode-bidi", "isolate", "isolate-override", "plaintext");
                this.replace(/(-moz-){2,}/g, "-moz-");
            }
        });
    } else if ('msTextCombineHorizontal' in style) {
        extend(Tweaker.prototype, {
            prefix: "-ms-",
            tweakPlatform: function tweakIE() {
                this.renameProperty("text-combine-(horizontal|upright)", "-ms-text-combine-horizontal");
                this.renameValue("writing-mode",
                    "horizontal-tb", "lr-tb",
                    "vertical-rl", "tb-rl",
                    "vertical-lr", "tb-lr");
                this.replace(/(-ms-){2,}/g, "-ms-");
            }
        });
    } else {
        throw new Error("Unsupported browser");
    }

    function recalc(element) {
        var saved = element.style.display;
        element.style.display = "none";
        element.offsetTop;
        element.style.display = saved;
    }

    function extend(target, dict) {
        for (var property in dict)
            target[property] = dict[property];
    }

    function forEach(list, func) {
        for (var i = 0; i < list.length; i++)
            func(list[i]);
    }

    new Tweaker().tweakDocument(document);
})();
