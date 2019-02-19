export class Lexer {
    public static classify(tokens: string[]): string[] {
        let types = [];
        let keywords = [
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

        let literal = [
            "null",
            "false",
            "true",
            "default"
        ];

        let contextual = [
            "add", "alias", "ascending", "async", "await", "by", "descending", "dynamic", "equals",
            "from", "get", "global", "group", "into", "join", "let", "nameof", "on", "orderby", "partial",
            "remove", "select", "set", "value", "var", "when", "where", "yield"
        ];

        for (let i in tokens) {
            let token = tokens[i];
            if (token.startsWith("#")) {
                types.push("pp");
            } else if (token.startsWith("//") || token.startsWith("/*")) {
                types.push("comment");
            } else if (token.startsWith("@\"") || token.startsWith("\"")) {
                types.push("string");
            } else if (tokens[parseInt(i) - 1] == "[" && tokens[parseInt(i) + 1] == ":") {
                types.push("target");
            } else if (literal.includes(token)) {
                types.push("literalk");
            } else if (contextual.includes(token) && types[parseInt(i) - 1] != "keyword") {
                types.push("ckeyword");
            } else if (keywords.includes(token)) {
                types.push("keyword");
            } else {
                types.push("none");
            }
        }

        return types;
    }
};