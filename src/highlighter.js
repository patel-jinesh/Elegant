"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var tokenizer_1 = require("./tokenizer");
var buffer_1 = require("./buffer");
var Highlighter = /** @class */ (function () {
    function Highlighter() {
    }
    Highlighter.highlight = function (code, rules) {
        var escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        var html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var buff = new buffer_1.Buffer(html);
        var tokens = new tokenizer_1.Tokenizer(code).tokenize(rules);
        var types = lexer_1.Lexer.classify(tokens);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var type = types[i];
            var tokenhtml = token.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            buff.seek(/\s+/);
            if (type == "none") {
                buff.seek(new RegExp(escape(tokenhtml)));
                continue;
            }
            var span = "<span class='" + type + "'>" + tokenhtml + "</span>";
            buff.capture(new RegExp(escape(tokenhtml)), String, true);
            buff.insert(span, true);
        }
        return buff.getData();
    };
    return Highlighter;
}());
exports.Highlighter = Highlighter;
//# sourceMappingURL=highlighter.js.map