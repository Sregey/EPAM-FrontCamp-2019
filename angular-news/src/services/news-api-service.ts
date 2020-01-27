import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INewsService } from './news-service-interface';
import { Source } from 'src/models/source';
import { News } from 'src/models/news';
import { NewsFilter } from 'src/models/news-filter';

@Injectable()
export class NewsApiService implements INewsService {

    private static API_URL = 'https://newsapi.org/v2';

    private authHeaders = new HttpHeaders({
        'X-Api-Key':  '147d0842a27e4dc88c966d48f1b40e46',
    });

    constructor(private http: HttpClient) { }

    getSources(): Observable<Source[]> {
        const httpOptions = {headers: this.authHeaders};
        return this.http.get(`${NewsApiService.API_URL}/sources`, httpOptions).pipe<Source[]>(
            map((response: any) => {
                return response.sources.map((source: any) =>
                    new Source({
                        id: source.id,
                        name: source.name,
                    })
                );
            })
        );
    }

    getNews(filter: NewsFilter): Observable<News[]> {
        let params = new HttpParams();
        if (filter) {
        params = params
            .set('sources', filter.source)
            .set('q', filter.keywords)
            .set('page', filter.page.toString())
            .set('pageSize', filter.pageSize.toString());
        }
        const httpOptions = {headers: this.authHeaders, params};
        return this.http.get(`${NewsApiService.API_URL}/top-headlines`, httpOptions).pipe<News[]>(
            map((response: any) => {
                return response.articles.map((article: any) =>
                    new News({
                        title: article.title,
                        description: article.description,
                        text: article.content,
                        date: article.publishedAt,
                        imageUrl: article.urlToImage === 'null' ? null : article.urlToImage,
                        author: article.author,
                        source: new Source(article.source),
                        url: article.url,
                    })
                );
            })
        );
    }
}
