import { Component, OnInit, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Source } from 'src/models/source';
import { News } from 'src/models/news';
import { NewsFilter } from 'src/models/news-filter';
import { NewsInMemoryService } from 'src/services/news-in-memory-service';
import { NewsApiService } from 'src/services/news-api-service';

import { NewsItemComponent } from './news-item/news-item.component';
import { INewsService } from 'src/services/news-service-interface';

@Component({
    selector: 'app-news-list-page',
    templateUrl: './news-list-page.component.html',
    styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent implements OnInit {
    private static readonly pageSize = 2;

    private currentPage: number;

    news: News[];
    sources: Source[];

    source: FormControl;
    keyWords: FormControl;
    onlyLocal: FormControl;

    @ViewChild('newsContainer', { read: ViewContainerRef, static: false }) newsContainer: ViewContainerRef;

    constructor(
        private newsService: NewsInMemoryService,
        private newsApiService: NewsApiService,
        private factoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.currentPage = 1;
        this.news = [];

        this.source = new FormControl('');
        this.keyWords = new FormControl('');
        this.onlyLocal = new FormControl(false);

        this.newsApiService.getSources().subscribe(sources => {
            this.sources = sources;
            this.source.setValue(sources[0].id);

            this.reloadNews();
        });
    }

    reloadNews() {
        this.news = [];
        this.currentPage = 1;
        this.loadNews();
    }

    loadNews() {
        const filter = new NewsFilter({
            source: this.source.value,
            keywords: this.keyWords.value,
            page: this.currentPage,
            pageSize: NewsListPageComponent.pageSize,
        });

        const newsService: INewsService = this.onlyLocal.value ? this.newsService : this.newsApiService;
        newsService.getNews(filter).subscribe(news => {
            this.news = this.news.concat(news);
            this.loadNewsComponent(NewsItemComponent, this.news);
        });
    }

    loadMore() {
        this.currentPage++;
        this.loadNews();
    }

    deleteNews = (newsId: number) => {
        this.newsService.delete(newsId);
        this.reloadNews();
    }

    private loadNewsComponent(type: Type<NewsItemComponent>, news: News[]): void {
        const componentFactory = this.factoryResolver.resolveComponentFactory(type);
        this.newsContainer.clear();

        for (const newsItem of news) {
            const componentRef = this.newsContainer.createComponent(componentFactory);
            const inst = componentRef.instance as NewsItemComponent;
            inst.newsItem = newsItem;
            inst.onDelete = this.deleteNews;
        }
    }
}
