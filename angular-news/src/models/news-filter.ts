export class NewsFilter {
    public source: string;
    public keywords: string;
    public page: number;
    public pageSize: number;

    constructor(init?: Partial<NewsFilter>) {
        Object.assign(this, init);
    }
}
