"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer = /** @class */ (function () {
    function Lexer() {
    }
    Lexer.classify = function (tokens) {
        var types = [];
        var keywords = [
            "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
            "char", "checked", "class", "const", "continue", "decimal",
            "delegate", "do", "double", "else", "enum", "event", "explicit", "extern",
            "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
            "in", "int", "interface", "internal", "is", "lock", "long", "namespace", "new",
            "object", "operator", "out", "override", "params", "private", "protected",
            "public", "readonly", "ref", "return", "sbyte", "sealed", "short", "sizeof", "stackalloc",
            "static", "string", "struct", "switch", "this", "throw", "try", "typeof", "uint",
            "ulong", "unchecked", "unsafe", "ushort", "using", "using", "static", "virtual", "void",
            "volatile", "while"
        ];
        var literal = [
            "null",
            "false",
            "true",
            "default"
        ];
        var contextual = [
            "add", "alias", "ascending", "async", "await", "by", "descending", "dynamic", "equals",
            "from", "get", "global", "group", "into", "join", "let", "nameof", "on", "orderby", "partial",
            "remove", "select", "set", "value", "var", "when", "where", "yield"
        ];
        for (var i in tokens) {
            var token = tokens[i];
            if (token.startsWith("#")) {
                types.push("pp");
            }
            else if (token.startsWith("//") || token.startsWith("/*")) {
                types.push("comment");
            }
            else if (token.startsWith("@\"") || token.startsWith("\"")) {
                types.push("string");
            }
            else if (tokens[parseInt(i) - 1] == "[" && tokens[parseInt(i) + 1] == ":") {
                types.push("target");
            }
            else if (literal.includes(token)) {
                types.push("literalk");
            }
            else if (contextual.includes(token) && types[parseInt(i) - 1] != "keyword") {
                types.push("ckeyword");
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