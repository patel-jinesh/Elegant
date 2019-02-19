"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("./tokenizer");
var buffer_1 = require("./buffer");
var Lexer = /** @class */ (function () {
    function Lexer(code, rules) {
        var escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        var html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var buff = new buffer_1.Buffer(html);
        var tokens = new tokenizer_1.Tokenizer(code).tokenize(rules);
        var types = this.classify(tokens);
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
        /*let cursor = 0;

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let type = types[i];

            let tokenhtml = token.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            if (type == "none") {
                cursor += html.substring(cursor, html.length).match("^" + escape(tokenhtml) + "\\s*")[0].length;
                continue;
            }

            let temp = html.indexOf(tokenhtml, cursor);

            if (temp == -1)
                cursor = html.indexOf(html.substring(cursor, html.length).match(new RegExp(escape(tokenhtml).replace("\n", "[\\s]*")))[0], cursor);
            else
                cursor = temp;

            let span = "<span class='" + type + "'>" + tokenhtml + "</span>";
            html = html.substring(0, cursor) + span + html.substring(cursor + tokenhtml.length, html.length);
            cursor += html.substring(cursor, html.length).match("^" + escape(span) + "\\s*")[0].length;
        }*/
        this.v = buff.getData();
    }
    Lexer.prototype.classify = function (tokens) {
        var types = [];
        var keywords = [
            "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
            "char", "checked", "class", "const", "continue", "decimal", "default",
            "delegate", "do", "double", "else", "enum", "event", "explicit", "extern",
            "false", "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
            "in", "int", "interface", "internal", "is", "lock", "long", "namespace", "new",
            "null", "object", "operator", "out", "override", "params", "private", "protected",
            "public", "readonly", "ref", "return", "sbyte", "sealed", "short", "sizeof", "stackalloc",
            "static", "string", "struct", "switch", "this", "throw", "true", "try", "typeof", "uint",
            "ulong", "unchecked", "unsafe", "ushort", "using", "using", "static", "virtual", "void",
            "volatile", "while"
        ];
        var contextual = [
            "add", "alias", "ascending", "async", "await", "by", "descending", "dynamic", "equals",
            "from", "get", "global", "group", "into", "join", "let", "nameof", "on", "orderby", "partial",
            "remove", "select", "set", "value", "var", "when", "where", "yield"
        ];
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            if (token.startsWith("//") || token.startsWith("/*")) {
                types.push("comment");
            }
            else if (token.startsWith("@\"") || token.startsWith("\"")) {
                types.push("string");
            }
            else if (keywords.includes(token)) {
                types.push("keyword");
            }
            else {
                types.push("none");
            }
        }
        return types;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
;
//# sourceMappingURL=lexer.js.map