"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(data) {
        // The cursor should be at the start of the file.
        this.buff = new buffer_1.Buffer(data);
    }
    Tokenizer.prototype.tokenize = function (rules) {
        var tokens = [];
        while (!this.buff.eoc()) {
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                // Skip whitespace
                this.buff.seek(/\s+\n?/);
                var c = this.buff.capture(rule, String);
                if (c == null)
                    continue;
                for (var _a = 0, c_1 = c; _a < c_1.length; _a++) {
                    var v = c_1[_a];
                    tokens.push(v.toString());
                }
                break;
            }
        }
        return tokens;
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map