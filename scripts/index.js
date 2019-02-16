"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var code = "int myInt;\n\nmyInt = 35;\nint func() {\n\tint x = 5;\n}";
code = "season = (Season)2;\nseason = season + 1; // This is a comment\nseason = season + season2;\nint value = (int)season;\n/*\n    /* Multiline comment.\n    So I can type here too.\n*/\nif (i == 0 && l <= 0) {\n\n}\nTestDelegate del = n => { string s = n + \"\\\"\\n World\\\"\"; \n                          Console.WriteLine(s); };\n\nstring s = @\"Hello\"\"Hello\n\t\t\"\"Hello\";\nseason <<= 3;\nseason++;\nseason--;";
var lex = new lexer_1.Lexer(code);
//# sourceMappingURL=index.js.map