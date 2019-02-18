"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer = /** @class */ (function () {
    function Buffer(data) {
        this.cursor = 0;
        this.data = data;
    }
    Buffer.prototype.seek = function (regex) {
        regex = new RegExp(regex, "g");
        regex.lastIndex = this.cursor;
        var m = regex.exec(this.data);
        if (m == null || m.index != this.cursor)
            return 0;
        this.cursor += m[0].length;
        return m[0].length;
    };
    Buffer.prototype.capture = function (regex, type) {
        regex = new RegExp(regex, "g");
        regex.lastIndex = this.cursor;
        var m = regex.exec(this.data);
        if (m == null || m.index != this.cursor)
            return null;
        this.cursor += m[0].length;
        return new type(m[0]);
    };
    Buffer.prototype.eob = function () {
        return this.cursor == this.data.length;
    };
    return Buffer;
}());
exports.Buffer = Buffer;
//# sourceMappingURL=buffer.js.map