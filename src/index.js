"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var highlighter_1 = require("./highlighter");
var code = "int myInt;\n\nmyInt = 35;\nint func() {\n\tint x = 5;\n}";
code = "#error Error message\n#warning Warning message\n#pragma warning disable 414, 3021\n#pragma warning restore 3021\n#line 6\n#line 2 \"test.cs\"\n#line default\n#line hidden\n#define foo\n#if foo\n#else\n#endif\n#undef foo\n \nextern alias Foo;\n \nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Linq.Expressions;\nusing System.Text;\nusing M = System.Math;\n \n#if DEBUG || TRACE\nusing System.Diagnostics;\n#elif SILVERLIGHT\nusing System.Diagnostics;\n#else\nusing System.Diagnostics;\n#endif\n \n#region Region\n \n#region more\nusing ConsoleApplication2.Test;\n#endregion\nusing X = int1;\nusing X = ABC.X<int>;\n \n#endregion\n \n[assembly: System.Copyright(@\"(C) 2009\")]\n[module: System.Copyright(\"\\n\\t\\u0123(C) 2009\" + \"\\u0123\")]\n \nclass TopLevelType : IDisposable\n{\n    void IDisposable.Dispose() { }\n}\n \nnamespace My\n{\n    using A.B;\n \n    interface CoContra<out T, in K> { }\n    delegate void CoContra2<out T, in K> () where T : struct;\n \n    public unsafe partial class A : C, I\n    {\n        [method: Obsolete]\n        public A([param: Obsolete] int foo) :\n            base(1)\n        {\n        L:\n            {\n                int i = sizeof(int);\n                ++i;\n            }\n \n#if DEBUG\n      Console.WriteLine(export.iefSupplied.command);\n#endif\n            const int? local = int.MaxValue;\n            const Guid? local0 = new Guid(r.ToString());\n \n            var \u043F\u0440\u0438\u0432\u0435\u0442 = local;\n            var \u043C\u0438\u0440 = local;\n            var local3 = 0, local4 = 1;\n            local3 = local4 = 1;\n            var local5 = null as Action ?? null;\n            var local6 = local5 is Action;\n \n            var u = 1u;\n            var U = 1U;\n            long hex = 0xBADC0DE, Hex = 0XDEADBEEF, l = -1L, L = 1L, l2 = 2l;\n            ulong ul = 1ul, Ul = 1Ul, uL = 1uL, UL = 1UL,\n                lu = 1lu, Lu = 1Lu, lU = 1lU, LU = 1LU;\n \n            bool @bool;\n            byte @byte;\n            char @char = 'c', \\u0066 = '\\u0066', hexchar = '\\x0130', hexchar2 = (char)0xBAD;\n            string \\U00000065 = \"\\U00000065\";\n            decimal @decimal = 1.44M;\n            dynamic @dynamic;\n            double @double = M.PI;\n            float @float = 1.2f;\n            int @int = local ?? -1;\n            long @long;\n            object @object;\n            sbyte @sbyte;\n            short @short;\n            string @string = @\"\"\"/*\";\n            uint @uint;\n            ulong @ulong;\n            ushort @ushort;\n            \n            dynamic dynamic = local5;\n            var add = 0;\n            var ascending = 0;\n            var descending = 0;\n            var from = 0;\n            var get = 0;\n            var global = 0;\n            var group = 0;\n            var into = 0;\n            var join = 0;\n            var let = 0;\n            var orderby = 0;\n            var partial = 0;\n            var remove = 0;\n            var select = 0;\n            var set = 0;\n            var value = 0;\n            var var = 0;\n            var where = 0;\n            var yield = 0;\n \n            if (i > 0)\n            {\n                return;\n            }\n            else if (i == 0)\n            {\n                throw new Exception();\n            }\n            var o1 = new MyObject();\n            var o2 = new MyObject(var);\n            var o3 = new MyObject { A = i };\n            var o4 = new MyObject(@dynamic)\n            {\n                A = 0,\n                B = 0,\n                C = 0\n            };\n            var o5 = new { A = 0 };\n            var dictionaryInitializer = new Dictionary<int, string> \n            { \n                {1, \"\"}, \n                {2, \"a\"} \n            };\n            float[] a = new float[] \n            {\n                0f,\n                1.1f\n            };\n            int[] arrayTypeInference = new[] { 0, 1, };\n            switch (i)\n            {\n                case 1:\n                    {\n                        goto case 2;\n                    }\n                case 2:\n                    {\n                        goto default;\n                        break;\n                    }\n                default:\n                    {\n                        return;\n                    }\n            }\n            while (i < 10)\n            {\n                ++i;\n            }\n            do\n            {\n                ++i;\n            }\n            while (i < 10);\n            for (int j = 0; j < 100; ++j)\n            {\n                Console.WriteLine(j);\n            }\n            foreach (var i in Items())\n            {\n                if (i == 7)\n                    return;\n                else\n                    continue;\n            }\n            checked\n            {\n                checked(++i);\n            }\n            unchecked\n            {\n                unchecked(++i);\n            }\n            lock (sync)\n                process();\n            using (var v = BeginScope())\n            using (A a = new A())\n            using (BeginScope())\n                return;\n            yield return this.items[3];\n            yield break;\n            fixed (int* p = stackalloc int[100])\n            {\n                *intref = 1;\n            }\n            unsafe\n            {\n                int* p = null;\n            }\n            try\n            {\n                throw null;\n            }\n            catch (System.AccessViolationException av)\n            {\n                throw av;\n            }\n            catch (Exception)\n            {\n                throw;\n            }\n            finally\n            {\n                try { } catch { }\n            }\n            var anonymous = \n            {\n                A = 1,\n                B = 2,\n                C = 3,\n            };\n            var query = from c in customers\n                        let d = c\n                        where d != null\n                        join c1 in customers on c1.GetHashCode() equals c.GetHashCode()\n                        join c1 in customers on c1.GetHashCode() equals c.GetHashCode() into e\n                        group c by c.Country\n                            into g\n                            orderby g.Count() ascending\n                            orderby g.Key descending\n                            select new { Country = g.Key, CustCount = g.Count() };\n        }\n        ~A()\n        {\n        }\n        private readonly int f1;\n        [Obsolete]\n        [NonExisting]\n        [Foo::NonExisting(var, 5)]\n        [CLSCompliant(false)]\n        [Obsolete, System.NonSerialized, NonSerialized, CLSCompliant(true || false & true)]\n        private volatile int f2;\n        [return: Obsolete]\n        [method: Obsolete]\n        public void Handler(object value)\n        {\n        }\n        public int m<T>(T t)\n          where T : class, new()\n        {\n            base.m(t);\n            return 1;\n        }\n        public string P\n        {\n            get\n            {\n                return \"A\";\n            }\n            set;\n        }\n        public abstract string P\n        {\n            get;\n        }\n        public abstract int this[int index]\n        {\n            protected internal get;\n            internal protected set;\n        }\n        [method: Obsolete]\n        [field: Obsolete]\n        [event: Obsolete]\n        public readonly event Event E;\n        [event: Test]\n        public event Action E1\n        {\n            [Obsolete]\n            add { value = value; }\n            [Obsolete]\n            [return: Obsolete]\n            remove { }\n        }\n        public static A operator +(A first, A second)\n        {\n            Delegate handler = new Delegate(Handler);\n            return first.Add(second);\n        }\n        [method: Obsolete]\n        [return: Obsolete]\n        public static bool operator true(A a)\n        {\n            return true;\n        }\n        public static bool operator false(A a)\n        {\n            return false;\n        }\n        class C\n        {\n        }\n    }\n    public struct S : I\n    {\n        public S()\n        {\n        }\n        private int f1;\n        [Obsolete]\n        private volatile int f2;\n        public abstract int m<T>(T t)\n          where T : struct\n        {\n            return 1;\n        }\n        public string P\n        {\n            get\n            {\n                int value = 0;\n                return \"A\";\n            }\n            set;\n        }\n        public abstract string P\n        {\n            get;\n        }\n        public abstract int this[int index]\n        {\n            get;\n            internal protected set;\n        }\n        public event Event E;\n        public static A operator +(A first, A second)\n        {\n            return first.Add(second);\n        }\n        fixed int field[10];\n        class C\n        {\n        }\n    }\n    public interface I\n    {\n        void A(int value);\n        string Value\n        {\n            get;\n            set;\n        }\n    }\n    [type: Flags]\n    public enum E\n    {\n        A,\n        B = A,\n        C = 2 + A,\n \n#if DEBUG\n    D,\n#endif\n \n    }\n    public delegate void Delegate(object P);\n    namespace Test\n    {\n        using System;\n        using System.Collections;\n        public class \u0421\u043F\u0438\u0441\u043E\u043A\n        {\n            public static IEnumerable Power(int number, int exponent)\n            {\n                \u0421\u043F\u0438\u0441\u043E\u043A \u0421\u043F\u0438\u0441\u043E\u043A = new \u0421\u043F\u0438\u0441\u043E\u043A();\n                \u0421\u043F\u0438\u0441\u043E\u043A.Main();\n                int counter = 0;\n                int \u05D0\u05EA\u05E8 = 0;\n                while (++counter++ < --exponent--)\n                {\n                    result = result * number + +number+++++number;\n                    yield return result;\n                }\n            }\n            static void Main()\n            {\n                foreach (int i in Power(2, 8))\n                {\n                    Console.Write(\"{0} \", i);\n                }\n            }\n        }\n    }\n}\n \nnamespace ConsoleApplication1\n{\n    namespace RecursiveGenericBaseType\n    {\n        class A<T> : B<A<T>, A<T>>\n        {\n            protected virtual A<T> M() { }\n            protected abstract B<A<T>, A<T>> N() { }\n            static B<A<T>, A<T>> O() { }\n        }\n \n        sealed class B<T1, T2> : A<B<T1, T2>>\n        {\n            protected override A<T> M() { }\n            protected sealed override B<A<T>, A<T>> N() { }\n            new static A<T> O() { }\n        }\n    }\n \n    namespace Boo\n    {\n        public class Bar<T> where T : IComparable\n        {\n            public T f;\n            public class Foo<U> : IEnumerable<T>\n            {\n                public void Method<K, V>(K k, T t, U u)\n                    where K : IList<V>, IList<T>, IList<U>\n                    where V : IList<K>\n                {\n                    A<int> a;\n                }\n            }\n        }\n    }\n \n    class Test\n    {\n        void Bar3()\n        {\n            var x = new Boo.Bar<int>.Foo<object>();\n            x.Method<string, string>(\" \", 5, new object());\n \n            var q = from i in new int[] { 1, 2, 3, 4 }\n                    where i > 5\n                    select i;\n        }\n \n        public static implicit operator Test(string s)\n        {\n            return new ConsoleApplication1.Test();\n        }\n        public static explicit operator Test(string s)\n        {\n            return new Test();\n        }\n \n        public int foo = 5;\n        void Bar2()\n        {\n            foo = 6;\n            this.Foo = 5.GetType(); Test t = \"sss\";\n        }\n \n        public event EventHandler MyEvent = delegate { };\n \n        void Blah()\n        {\n            int i = 5;\n            int? j = 6;\n \n            Expression<Func<int>> e = () => i;\n            Expression<Func<bool, Action>> e2 = b => () => { return; };\n            Func<bool, bool> f = delegate (bool a)\n            {\n                return !a;\n            };\n            Action a = Blah;\n        }\n \n        public Type Foo\n        {\n            [Obsolete(\"Name\", error = false)]\n            get\n            {\n                return typeof(IEnumerable<>);\n            }\n            set\n            {\n                var t = typeof(System.Int32);\n                t.ToString();\n                t = value;\n            }\n        }\n \n        public void Constants()\n        {\n            int i = 1 + 2 + 3 + 5;\n            global::System.String s = \"a\" + (System.String)\"a\" + \"a\" + \"a\" + \"a\" + \"A\";\n        }\n \n        public void ConstructedType()\n        {\n            List<int> i = null;\n            int c = i.Count;\n        }\n    }\n}\n \nnamespace Comments.XmlComments.UndocumentedKeywords\n{\n    /// <summary>\n    /// Whatever \n    /// </summary>\n    /// <!-- c -->\n    /// <![CDATA[c]]> //\n    /// <c></c> /* */\n    /// <code></code>\n    /// <example></example>\n    /// <exception cref=\"bla\"></exception>\n    /// <include file='' path='[@name=\"\"]'/>\n    /// <permission cref=\" \"></permission>\n    /// <remarks></remarks>\n    /// <see cref=\"\"/>\n    /// <seealso cref=\" \"/>\n    /// <value></value>\n    /// <typeparam name=\"T\"></typeparam>\n    class /*///*/C<T>\n    {\n        void M<U>(T t, U u)\n        {\n            // comment\n            /* *** / */\n            /* //\n             */\n            /*s*///comment\n            // /***/\n            /*s*/int /*s*/intValue = 0;\n            intValue = intValue /*s*/+ 1;\n            string strValue = /*s*/\"hello\";\n            /*s*/MyClass c = new MyClass();\n            string verbatimStr = /*s*/@\"\\\\\\\\\";\n        }\n    }\n \n    //General Test F. Type a very long class name, verify colorization happens correctly only upto the correct size (118324)\n    class TestClassXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/*Scen8*/{ }\n \n    class TestClassXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX22/*Scen9*/{ }\n \n    class yield\n    {\n        void Foo<U>(__arglist)\n        {\n            C<U> c = null;\n            c.M<int>(5, default(U));\n            TypedReference tr = __makeref(c);\n            Type t = __reftype(tr);\n            int j = __refvalue(tr, int);\n            Params(a: t, b: t);\n        }\n        void Params(ref dynamic a, out dynamic b, params dynamic[] c) {}\n        void Params(out dynamic a = 2, ref dynamic c = default(dynamic), params dynamic[][] c) {}\n \n        public override string ToString() { return base.ToString(); } \n \n        public partial void OnError();\n \n        public partial void method()\n        {\n            int?[] a = new int?[5];/*[] bug*/ // YES []\n            int[] var = { 1, 2, 3, 4, 5 };/*,;*/\n            int i = a[i];/*[]*/\n            Foo<T> f = new Foo<int>();/*<> ()*/\n            f.method();/*().*/\n            i = i + i - i * i / i % i & i | i ^ i;/*+ - * / % & | ^*/\n            bool b = true & false | true ^ false;/*& | ^*/\n            b = !b;/*!*/\n            i = ~i;/*~i*/\n            b = i < i && i > i;/*< && >*/\n            int? ii = 5;/*? bug*/ // NO ?\n            int f = true ? 1 : 0;/*? :*/   // YES :\n            i++;/*++*/\n            i--;/*--*/\n            b = true && false || true;/*&& ||*/\n            i << 5;/*<<*/\n            i >> 5;/*>>*/\n            b = i == i && i != i && i <= i && i >= i;/*= == && != <= >=*/\n            i += 5.0;/*+=*/\n            i -= i;/*-=*/\n            i *= i;/**=*/\n            i /= i;/*/=*/\n            i %= i;/*%=*/\n            i &= i;/*&=*/\n            i |= i;/*|=*/\n            i ^= i;/*^=*/\n            i <<= i;/*<<=*/\n            i >>= i;/*>>=*/\n            object s = x => x + 1;/*=>*/\n            Point point;\n            unsafe\n            {\n                Point* p = &point;/** &*/\n                p->x = 10;/*->*/\n            }\n            IO::BinaryReader br = null;\n        }\n \n        struct Point { public int X; public int Y; }\n    }\n}";
var tokens = [
    /@"(?:[^"]|(?:"")*)*"|\$?"(?:\\"|[^"])*"/,
    /\/\*(?:.|\n)*?\*\/|\/\/.*/,
    /(\+\+|--)[ ]*([^ {}(),;/*+\-%?:=<>[\]\.!~&\^|\n"]+)[ ]*(\+\+|--)|([^ {}(),;/*+\-%?:=<>[\]\.!~&\^|\n"]+)[ ]*(\+\+|--)|(\+\+|--)[ ]*([^ {}(),;/*+\-%?:=<>[\]\.!~&\^|\n"]+)/,
    /\d(?:[\d_]*\d|\d*)\.\d(?:[\d_]*\d|\d*)(?:e[+-]?\d(?:[\d_]*\d|\d*))?[fmd]?|0x[\da-f](?:[\d_a-f]*[\da-f]|[\da-f]*)|0b[01](?:[01_]*[01]|[01]*)|\d(?:[\d_]*\d|\d*)(?:ul|lu|l|u|f|m|d)?/i,
    /[^ {}(),;/*+\-%?:=<>[\]\.!~&\^|\n"]+/,
    /(<<|>>)(?![^(]*=)(?=.*;.*\n)/,
    /[*+\-%\/=<>!&\^|]=|<<=|>>=|(?:-|=)>|\?(?:\?|\.)|&&|\|\||::|[ {}(),;*+\-%?:=<>[\]\.!~&\^|]|\/(?!\/|\*)/
];
var lex = highlighter_1.Highlighter.highlight(code, tokens).trim();
function codeAddress() {
    var c = document.getElementsByTagName("code")[0];
    c.innerHTML = lex;
    console.log(lex);
    var lines = code.match(/\n|\r/g).length + 1;
    var a = "";
    for (var i = 1; i <= lines; i++)
        a += i.toString() + "\n";
    var x = document.createElement("div");
    x.innerText = a;
    x.className = "lines";
    c.parentElement.insertBefore(x, c);
}
window.onload = codeAddress;
//# sourceMappingURL=index.js.map