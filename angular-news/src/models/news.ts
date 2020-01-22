export class News {
    public id: number;
    public title: string;
    public description: string;
    public text: string;
    public imageUrl: string;
    public date: Date;
    public author: string;
    public isLocal: boolean;
    public source: string;
    public sourceUrl: string;

    constructor(init?: Partial<News>) {
        Object.assign(this, init);
    }
}