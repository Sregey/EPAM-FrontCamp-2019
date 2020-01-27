import { NetworkHelper } from 'src/helpers/network-helper';
import { Source } from './source';

export class News {
    public id: number;
    public title: string;
    public description: string;
    public text: string;
    public imageUrl: string;
    public date: Date;
    public author: string;
    public source: Source;
    public url: string;

    constructor(init?: Partial<News>) {
        Object.assign(this, init);
    }

    get isLocal(): boolean { return !NetworkHelper.isValidUrl(this.url); }
}
