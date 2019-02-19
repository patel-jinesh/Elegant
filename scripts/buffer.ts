export class Buffer {
    private data: string;
    private cursor: number;

    public constructor(data: string) {
        // The cursor should be at the start of the file.
        this.cursor = 0;
        this.data = data;
    }

    public seek(regex: RegExp): number {
        /*
            The regex requires the global flag to make sure it uses the lastIndex property
            so that it matches starting at the cursor location. Thus we add the global flag
            if it is not already included while maintaining the previous flags.
        */
        let flags = regex.flags;

        if (!flags.includes("g"))
            flags += "g";

        regex = new RegExp(regex, flags);

        // Set the lastIndex to the cursor as the starting position for matching.
        regex.lastIndex = this.cursor;

        // Execute the regex and find a match.
        let m = regex.exec(this.data);

        // If no match was found or the match was not at the current cursor location return 0.
        if (m == null || m.index != this.cursor)
            return 0;

        // Move the cursor to the end of the catured value.
        this.cursor += m[0].length;

        // Returns the number of positions the cursor moved.
        return m[0].length;
    }

    public insert(str: string, seekCursor?: boolean) {
        this.data = this.data.substring(0, this.cursor) + str + this.data.substring(this.cursor, this.data.length);
        
        if (seekCursor)
            this.cursor += str.length;
    }

    public capture<T>(regex: RegExp, type : new(string: string) => T, remove? : boolean): T[] {
        /*
            The regex requires the global flag to make sure it uses the lastIndex property
            so that it matches starting at the cursor location. Thus we add the global flag
            if it is not already included while maintaining the previous flags.
        */
        let flags = regex.flags;

        if (!flags.includes("g"))
            flags += "g";

        regex = new RegExp(regex, flags);

        // Set the lastIndex to the cursor as the starting position for matching.
        regex.lastIndex = this.cursor;

        // Execute the regex and find a match.
        let m = regex.exec(this.data);

        // If no match was found or the match was not at the current cursor location return null.
        if (m == null || m.index != this.cursor)
            return null;

        if (remove)
            this.data = this.data.substring(0, this.cursor) + this.data.substring(this.cursor + m[0].length, this.data.length);
        else
            // Move the cursor to the end of the catured value.
            this.cursor += m[0].length;
        
        // If there are no groups, return only the whole match.
        if (m.length == 1)
            return [new type(m[0])];

        // Otherwise extract the groups and return all the captured groups.
        let vals: T[] = [];

        // First value is the whole matched regex, so it is discarded.
        for (let i = 1; i < m.length; i++)
            // Don't return undefined groups.
            if (m[i] != undefined)
                vals.push(new type(m[i]));

        return vals;
    }

    public eoc(): boolean {
        return this.cursor == this.data.length;
    }

    public getData() : string {
        return this.data;
    }
}