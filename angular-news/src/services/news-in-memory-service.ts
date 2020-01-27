import { Observable } from 'rxjs';

import { INewsService } from './news-service-interface';
import { News } from 'src/models/news';
import { NewsFilter } from 'src/models/news-filter';
import { Source } from 'src/models/source';

export class NewsInMemoryService implements INewsService {
    private news: News[] = [
        new News({
            id: 1,
            title: 'title 1',
            description: 'description 1',
            text: 'text 1',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 1',
            source: Source.Local,
            url: 'title-1',
        }),
        new News({
            id: 2,
            title: 'title 2',
            description: 'description 2',
            text: 'text 2',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 2',
            source: Source.Local,
            url: 'title-2',
        }),
        new News({
            id: 3,
            title: 'title 3',
            description: 'description 3',
            text: 'text 3',
            date: new Date(),
            imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
            author: 'author 3',
            source: Source.Local,
            url: 'title-3',
        }),
    ];

    getNews(filter: NewsFilter): Observable<News[]> {
        return new Observable<News[]>(observer => {
            const start = (filter.page - 1) * filter.pageSize;
            const end = start + filter.pageSize;
            const news = this.news
                .filter(newsItem => {
                    if (!!filter.keywords) {
                        return newsItem.title.includes(filter.keywords);
                    } else {
                        return true;
                    }
                })
                .sort((n1, n2) => {
                    return n2.date.getTime() - n1.date.getTime();
                })
                .slice(start, end);

            observer.next(news);
        });
    }

    getNewsByUrl(url: string): News {
        return this.news.find((item) => item.url === url);
    }

    add(newItem: News) {
        const newId = this.news[this.news.length - 1].id + 1;
        newItem.id = newId;
        this.news.push(newItem);
    }

    update(item: News) {
        const index = this.news.findIndex((elem) => elem.id === item.id);
        if (index !== -1) {
            this.news[index] = item;
        }
    }

    delete(id: number) {
        const index = this.news.findIndex((elem) => elem.id === id);
        if (index !== -1) {
            this.news.splice(index, 1);
        }
    }
}
