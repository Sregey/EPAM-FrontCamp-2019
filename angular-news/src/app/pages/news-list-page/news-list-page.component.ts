import { Component, OnInit } from '@angular/core';

import { News } from 'src/models/news';
import { NewsService } from 'src/services/news-service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-news-list-page',
    templateUrl: './news-list-page.component.html',
    styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent implements OnInit {
    private static readonly pageSize = 2;

    private newsCount: number;

    sources: string[];
    news: News[];

    source: FormControl;
    keyWords: FormControl;
    onlyLocal: FormControl;

    constructor(private newsService: NewsService) { }

    ngOnInit() {
        this.newsCount = NewsListPageComponent.pageSize;

        this.sources = this.newsService.getAllSources();
        this.sources.unshift('All Sources');

        this.source = new FormControl(this.sources[0]);
        this.keyWords = new FormControl('');
        this.onlyLocal = new FormControl(false);

        this.loadNews();
    }

    loadNews() {
        this.news = this.newsService.getNews((news: News) => {
            let isAcceptable = true;
            if (isAcceptable && (this.source.value !== this.sources[0])) {
                isAcceptable = (news.source === this.source.value);
            }
            if (isAcceptable && this.onlyLocal.value) {
                isAcceptable = news.isLocal;
            }
            if (isAcceptable && !!this.keyWords.value) {
                isAcceptable = news.title.includes(this.keyWords.value);
            }
            return isAcceptable;
        }, this.newsCount);
    }

    loadMore() {
        this.newsCount += NewsListPageComponent.pageSize;
        this.loadNews();
    }
}
