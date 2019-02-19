import { Lexer } from "./lexer";
import { Tokenizer } from "./tokenizer";
import { Buffer } from "./buffer";

export class Highlighter {
    public static highlight(code : string, rules: RegExp[]) : string {
        let escape = function (string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        };

        let html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let buff: Buffer = new Buffer(html);

        let tokens = new Tokenizer(code).tokenize(rules);
        let types = Lexer.classify(tokens);

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

        return buff.getData();
    }
}