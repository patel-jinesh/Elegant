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
        html = html.replace(/\n/g, "<br>");
        this.v = html;
    }
    Lexer.prototype.classify = function (tokens) {
        var types = [];
        var keywords = [
            "abstract", "as", "base", "bool", "break", "byte", "case", "catch", "char",
            "checked", "class", "const", "continue", "decimal", "default", "delegate", "do",
            "double", "else", "enum", "event", "explicit", "extern", "false", "finally", "fixed",
            "float", "for", "foreach", "goto", "if", "implicit", "in", "int", "interface", "internal",
            "is", "lock", "long", "namespace", "new", "null", "object", "operator", "out", "override",
            "params", "private", "protected", "public", "readonly", "ref", "return", "sbyte", "sealed",
            "short", "sizeof", "stackalloc", "static", "string", "struct", "switch", "this", "throw",
            "true", "try", "typeof", "uint", "ulong", "unchecked", "unsafe", "ushort", "using", "var",
            "virtual", "void", "volatile", "while"
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
        var inString = false;
        for (var i = 0; i < code.length; i++) {
            if (code[i] == "@" && code[i + 1] == "\"") {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                var t = code.substring(i, code.length).match(/@"(?:[^"]|(?:"")*)*"/)[0];
                i += t.length - 1;
                arr.push(t);
                continue;
            }
            if (code[i] == "\"") {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                var t = code.substring(i, code.length).match(/"(?:\\"|[^"])*"/)[0];
                i += t.length - 1;
                arr.push(t);
                continue;
            }
            if (code[i] == "/" && (code[i + 1] == "/" || code[i + 1] == "*")) {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                var t = code.substring(i, code.length).match(/\/\*(?:.|\n)*?\*\/|\/\/.*/)[0];
                //mod = mod.replace(t, "");
                i += t.length - 1;
                arr.push(t);
                continue;
            }
            if (code[i] == "\"" && code[i - 1] == "@") {
                s = code.substring(i - 1, code.length).match(/@"(?:[^"]|(?:"")*)*"/)[0];
                arr.push(s);
                i += s.length;
                s = "";
            }
            var char = code[i];
            if (char == "\"" && code[i - 1] != "\\")
                inString = !inString;
            if (inString) {
                s += char;
                continue;
            }
            else if (char == "\"") {
                arr.push(s + char);
                s = "";
                continue;
            }
            if (!(" {}(),;/*+-%?:=<>[].!~&^|\n".includes(char)))
                s += char;
            else {
                if (s != "")
                    arr.push(s);
                if (char != " ")
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
            else if (arr[i] == "?" && arr[i + 1] == ".") {
                arr[i] = "?.";
                arr = arr.filter(function (v, index, a) {
                    return !(index == i + 1);
                });
            }
            else if (arr[i] == "?" && arr[i + 1] == "?") {
                arr[i] = "??";
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
        arr = arr.filter(function (v, index, a) {
            return v != "\n";
        });
        for (var i = 0; i < arr.length; i++) {
            arr[i].trim();
        }
        return arr;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
;
//# sourceMappingURL=lexer.js.map