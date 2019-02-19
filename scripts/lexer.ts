import { Tokenizer } from './tokenizer';
import { Buffer } from './buffer';

export class Lexer {
    v: string;
    constructor(code: string, rules: RegExp[]) {
        let escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        };

        let html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let buff: Buffer = new Buffer(html);

        let tokens = new Tokenizer(code).tokenize(rules);
        let types = this.classify(tokens);

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let type = types[i];

            let tokenhtml = token.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            buff.seek(/\s+/);

            if (type == "none") {
                buff.seek(new RegExp(escape(tokenhtml)));
                continue;
            }

            let span = "<span class='" + type + "'>" + tokenhtml + "</span>";
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
};