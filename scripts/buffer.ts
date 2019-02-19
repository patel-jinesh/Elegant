export class Buffer {
    private data: string;
    private cursor: number;

    public constructor(data: string) {
        this.cursor = 0;
        this.data = data;
    }

    public seek(regex: RegExp): number {
        regex = new RegExp(regex, "g");
        regex.lastIndex = this.cursor;
            
        let m = regex.exec(this.data);

        if (m == null || m.index != this.cursor)
            return 0;
        
        this.cursor += m[0].length;
        return m[0].length;
    }

    public capture<T>(regex: RegExp, type: new (string: string) => T): T[] {
        let flags = regex.flags;

        if (!flags.includes("g"))
            flags += "g";
        
        regex = new RegExp(regex, flags);
        regex.lastIndex = this.cursor;

        let m = regex.exec(this.data);

        if (m == null || m.index != this.cursor)
            return null;

        this.cursor += m[0].length;

        if (m.length == 1)
            return [new type(m[0])];

        let vals : T[] = [];

        for (let i = 1; i < m.length; i++)
            if (m[i] != undefined)
                vals.push(new type(m[i]));
        
        return vals;
    }

    public eob() : boolean {
        return this.cursor == this.data.length;
    }
}