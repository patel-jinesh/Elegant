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

    public capture<T>(regex: RegExp, type: new (string: string) => T): T {
        regex = new RegExp(regex, "g");
        regex.lastIndex = this.cursor;

        let m = regex.exec(this.data);

        if (m == null || m.index != this.cursor)
            return null;

        this.cursor += m[0].length;
        return new type(m[0]);
    }

    public eob() : boolean {
        return this.cursor == this.data.length;
    }
}