"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer = /** @class */ (function () {
    function Lexer(code) {
        console.log(code);
        code = code.replace(/[\t]+/gi, "");
        code = code.replace(/[ ]+/gi, " ");
        var comm = code.match(/\/\*(?:.|\n)*\*\/|\/\/.*\n/g);
        code = code.replace(/\/\*(?:.|\n)*\*\/|\/\/.*\n/g, "");
        var strs = code.match(/@"(?:[^"]|(?:"")*)*"/);
        code = code.replace(/[\n]+/gi, " ");
        var arr = [];
        console.log(code);
        arr = this.split(code);
        console.log(arr);
        console.log(comm);
        for (var i = 0; i < strs.length; i++) {
            var r = strs[i].replace("\n", " ");
            arr[arr.indexOf(r)] = strs[i];
        }
    }
    Lexer.prototype.split = function (code) {
        var arr = [];
        var s = "";
        var inString = false;
        for (var i = 0; i < code.length; i++) {
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
            if (!(" {}(),;/*+-%?:=<>[].!~&^|".includes(char)))
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
                if ("+-&|<>".includes(arr[i])) {
                    if (arr[i + 1] == arr[i]) {
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