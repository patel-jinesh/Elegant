import { Lexer } from "./lexer";

var code = "int myInt;\n\nmyInt = 35;\nint func() {\n\tint x = 5;\n}"
code = `season = (Season)2;
season = season + 1; // This is a comment
season = season + season2;
int value = (int)season;
/*
    /* Multiline comment.
    So I can type here too.
*/
if (i == 0 && l <= 0) {

}
TestDelegate del = n => { string s = n + "\\\"\\n World\\\""; 
                          Console.WriteLine(s); };

string s = @"Hello""Hello
		""Hello";
season <<= 3;
season++;
season--;`

let lex = new Lexer(code);