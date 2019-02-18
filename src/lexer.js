"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer = /** @class */ (function () {
    function Lexer(code) {
        var escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        var html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        code = code.replace(/[\t]+/gi, "");
        code = code.replace(/[ ]+/gi, " ");
        var tokens = this.split(code);
        var types = this.classify(tokens);
        var cursor = 0;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var type = types[i];
            var tokenhtml = token.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (type == "none") {
                cursor += html.substring(cursor, html.length).match("^" + escape(tokenhtml) + "\\s*")[0].length;
                continue;
            }
            var temp = html.indexOf(tokenhtml, cursor);
            if (temp == -1)
                cursor = html.indexOf(html.substring(cursor, html.length).match(new RegExp(escape(tokenhtml).replace("\n", "[\\s]*")))[0], cursor);
            else
                cursor = temp;
            var span = "<span class='" + type + "'>" + tokenhtml + "</span>";
            html = html.substring(0, cursor) + span + html.substring(cursor + tokenhtml.length, html.length);
            cursor += html.substring(cursor, html.length).match("^" + escape(span) + "\\s*")[0].length;
        }
        this.v = html;
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
    Lexer.prototype.split = function (code) {
        var arr = [];
        var s = "";
        var pairs = [];
        for (var i = 0; i < code.length; i++) {
            if (s != "" && (/^(\/(\/|\*))/.test(code.substr(i, 2)) || /^("|@")/.test(code.substr(i, 2)))) {
                arr.push(s);
                s = "";
            }
            if (/^("|@")/.test(code.substr(i, 2))) {
                var t = code.substring(i, code.length).match(/@"(?:[^"]|(?:"")*)*"|"(?:\\"|[^"])*"/)[0];
                i += t.length;
                arr.push(t);
            }
            if (/^(\/(\/|\*))/.test(code.substr(i, 2))) {
                var t = code.substring(i, code.length).match(/\/\*(?:.|\n)*?\*\/|\/\/.*/)[0];
                i += t.length;
                arr.push(t.trim());
            }
            if (/^(\/(\/|\*))/.test(code.substr(i, 2)) || /^("|@")/.test(code.substr(i, 2))) {
                i--;
                continue;
            }
            var char = code[i];
            if (!(" {}(),;/*+-%?:=<>[].!~&^|\n".includes(char)))
                s += char;
            else {
                if (s != "")
                    arr.push(s);
                if (char != " " && char != "\n")
                    arr.push(char);
                s = "";
            }
        }
        var _loop_1 = function (i) {
            if ("/*+-%=<>!&^|".includes(arr[i])) {
                if ("&|<>".includes(arr[i])) {
                    if (arr[i + 1] == arr[i]) {
                        arr[i] += arr[i];
                        arr = arr.filter(function (v, index, a) {
                            return !(index == i + 1);
                        });
                    }
                }
                if ("+-".includes(arr[i])) {
                    if (arr[i] == arr[i + 1] && /\w/g.test(arr[i - 1]) && !/\w/g.test(arr[i + 2])) {
                        arr[i] += arr[i];
                        arr = arr.filter(function (v, index, a) {
                            return !(index == i + 1);
                        });
                    }
                    else if (arr[i] == arr[i + 1] && /\w/g.test(arr[i + 2]) && !/\w/g.test(arr[i - 1])) {
                        arr[i] += arr[i];
                        arr = arr.filter(function (v, index, a) {
                            return !(index == i + 1);
                        });
                    }
                }
                if (arr[i + 1] == "=") {
                    arr[i] += "=";
                    arr = arr.filter(function (v, index, a) {
                        return !(index == i + 1);
                    });
                }
                if (arr[i] == "=" && arr[i + 1] == ">") {
                    arr[i] = "=>";
                    arr = arr.filter(function (v, index, a) {
                        return !(index == i + 1);
                    });
                }
            }
            else if (arr[i] == "?" && (arr[i + 1] == "." || arr[i + 1] == "?")) {
                arr[i] += arr[i + 1];
                arr = arr.filter(function (v, index, a) {
                    return !(index == i + 1);
                });
            }
            else if (arr[i] == "-" && arr[i + 1] == ">") {
                arr[i] = "->";
                arr = arr.filter(function (v, index, a) {
                    return !(index == i + 1);
                });
            }
            else if (arr[i] == ":" && arr[i + 1] == ":") {
                arr[i] = "::";
                arr = arr.filter(function (v, index, a) {
                    return !(index == i + 1);
                });
            }
        };
        for (var i = 0; i < arr.length - 1; i++) {
            _loop_1(i);
        }
        return arr;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
;
//# sourceMappingURL=lexer.js.map