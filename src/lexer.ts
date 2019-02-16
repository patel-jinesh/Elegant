export class Lexer {
    constructor(code : string) {
        console.log(code);

        code = code.replace(/[\t]+/gi, "")
        code = code.replace(/[ ]+/gi, " ")
        let comm = code.match(/\/\*(?:.|\n)*\*\/|\/\/.*\n/g);
        code = code.replace(/\/\*(?:.|\n)*\*\/|\/\/.*\n/g, "");
        let strs = code.match(/@"(?:[^"]|(?:"")*)*"/);
        code = code.replace(/[\n]+/gi, " ")

        let arr = [];

        console.log(code);

        arr = this.split(code);

        console.log(arr);
        console.log(comm);

        for (let i = 0; i < strs.length; i++) {
            let r = strs[i].replace("\n", " ");

            arr[arr.indexOf(r)] = strs[i];
        }
    }

    split(code: string) : string[] {
        let arr = [];

        let s = "";

        let inString = false;

        for (let i = 0; i < code.length; i++) {
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

            if (!(" {}(),;/*+-%?:=<>[].!~&^|".includes(char)))
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
                if ("+-&|<>".includes(arr[i])) {
                    if (arr[i + 1] == arr[i]) {
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
            }
        }

        return arr;
    }
};