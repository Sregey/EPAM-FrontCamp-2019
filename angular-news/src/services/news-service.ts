import { News } from 'src/models/news';

export class NewsService {
    private sources: string[] = ['source 1', 'source 2', 'source 3'];
    private news: News[] = [
        new News({
            id: 1,
            title: 'title 1',
            description: 'description 1',
            text: 'text 1',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 1',
            isLocal: true,
            source: 'source 1',
            sourceUrl: 'title-1',
        }),
        new News({
            id: 2,
            title: 'title 2',
            description: 'description 2',
            text: 'text 2',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 2',
            isLocal: false,
            source: 'source 1',
            sourceUrl: 'title-2',
        }),
        new News({
            id: 3,
            title: 'title 3',
            description: 'description 3',
            text: 'text 3',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 3',
            isLocal: true,
            source: 'source 2',
            sourceUrl: 'title-3',
        })
    ];

    getAllSources(): string[] {
        return this.sources;
    }

    getAllNews(): News[] {
        return this.news;
    }

    getNews(predicate, count: number): News[] {
        return this.news.filter(predicate).slice(0, count);
    }

    // getNewsById(id: number): News {
    //     return this.news.find((item) => item.id === id);
    // }

    getNewsBySourceUrl(url: string): News {
        return this.news.find((item) => item.sourceUrl === url);
    }
}