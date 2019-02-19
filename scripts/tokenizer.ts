import { Buffer } from "./buffer";

export class Tokenizer {
    private buff: Buffer;

    public constructor(data: string) {
        // The cursor should be at the start of the file.
        this.buff = new Buffer(data);
    }

    public tokenize(rules: RegExp[]) : string[] {
        let tokens : string[] = [];

        while (!this.buff.eoc()) {
            for (let rule of rules) {
                // Skip whitespace
                this.buff.seek(/\s+\n?/);

                let c = this.buff.capture(rule, String);
                
                if (c == null)
                    continue;

                for (let v of c)
                    tokens.push(v.toString());

                break;
            }
        }

        return tokens;
    }
}