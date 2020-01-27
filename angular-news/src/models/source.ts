export class Source {
    public static Local = new Source({name: 'Local'});

    public id: string;
    public name: string;

    constructor(init?: Partial<Source>) {
        Object.assign(this, init);
    }
}
