export class Lexer {
    v: string;
    constructor(code: string) {
        let escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        };

        let html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        code = code.replace(/[\t]+/gi, "")
        code = code.replace(/[ ]+/gi, " ")

        let tokens = this.split(code);
        let types = this.classify(tokens);

        let cursor = 0;

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
        }


        html = html.replace(/\n/g, "<br>");
        this.v = html;
    }

    classify(tokens: string[]): string[] {
        let types = [];
        let keywords = [
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

        let contextual = [
            "add", "alias", "ascending", "async", "await", "by", "descending", "dynamic", "equals",
            "from", "get", "global", "group", "into", "join", "let", "nameof", "on", "orderby", "partial",
            "remove", "select", "set", "value", "var", "when", "where", "yield"
        ];

        for (let token of tokens) {
            if (token.startsWith("//") || token.startsWith("/*")) {
                types.push("comment");
            } else if (token.startsWith("@\"") || token.startsWith("\"")) {
                types.push("string");
            } else if (keywords.includes(token)) {
                types.push("keyword");
            } else {
                types.push("none");
            }
        }

        return types;
    }

    split(code: string): string[] {
        let arr = [];

        let s = "";

        let inString = false;

        for (let i = 0; i < code.length; i++) {
            if (code[i] == "@" && code[i + 1] == "\"") {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                let t = code.substring(i, code.length).match(/@"(?:[^"]|(?:"")*)*"/)[0];
                i += t.length - 1;
                arr.push(t);
                continue;
            }
            if (code[i] == "\"") {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                let t = code.substring(i, code.length).match(/"(?:\\"|[^"])*"/)[0];
                i += t.length - 1;
                arr.push(t);
                continue;
            }
            if (code[i] == "/" && (code[i + 1] == "/" || code[i + 1] == "*")) {
                if (s != "") {
                    arr.push(s);
                    s = "";
                }
                let t = code.substring(i, code.length).match(/\/\*(?:.|\n)*?\*\/|\/\/.*/)[0];
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

            let char = code[i];

            if (char == "\"" && code[i - 1] != "\\")
                inString = !inString;

            if (inString) {
                s += char;
                continue;
            } else if (char == "\"") {
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
                    arr.push(char)
                s = "";
            }
        }

        for (let i = 0; i < arr.length - 1; i++) {
            if ("/*+-%=<>!&^|".includes(arr[i])) {
                if ("&|<>".includes(arr[i])) {
                    if (arr[i + 1] == arr[i]) {
                        arr[i] += arr[i];

                        arr = arr.filter((v, index, a) => {
                            return !(index == i + 1);
                        });
                    }
                }

                if ("+-".includes(arr[i])) {
                    if (arr[i] == arr[i + 1] && /\w/g.test(arr[i - 1]) && !/\w/g.test(arr[i + 2])) {
                        arr[i] += arr[i];
                        arr = arr.filter((v, index, a) => {
                            return !(index == i + 1);
                        });
                    } else if (arr[i] == arr[i + 1] && /\w/g.test(arr[i + 2]) && !/\w/g.test(arr[i - 1])) {
                        arr[i] += arr[i];
                        arr = arr.filter((v, index, a) => {
                            return !(index == i + 1);
                        });
                    }
                }

                if (arr[i + 1] == "=") {
                    arr[i] += "=";

                    arr = arr.filter((v, index, a) => {
                        return !(index == i + 1);
                    });
                }

                if (arr[i] == "=" && arr[i + 1] == ">") {
                    arr[i] = "=>";

                    arr = arr.filter((v, index, a) => {
                        return !(index == i + 1);
                    });
                }
            } else if (arr[i] == "?" && arr[i + 1] == ".") {
                arr[i] = "?.";

                arr = arr.filter((v, index, a) => {
                    return !(index == i + 1);
                });
            } else if (arr[i] == "?" && arr[i + 1] == "?") {
                arr[i] = "??";

                arr = arr.filter((v, index, a) => {
                    return !(index == i + 1);
                });
            } else if (arr[i] == "-" && arr[i + 1] == ">") {
                arr[i] = "->";

                arr = arr.filter((v, index, a) => {
                    return !(index == i + 1);
                });
            } else if (arr[i] == ":" && arr[i + 1] == ":") {
                arr[i] = "::";

                arr = arr.filter((v, index, a) => {
                    return !(index == i + 1);
                });
            }
        }

        arr = arr.filter((v, index, a) => {
            return v != "\n";
        });

        for (let i = 0; i < arr.length; i++) {
            arr[i].trim();
        }

        return arr;
    }
};