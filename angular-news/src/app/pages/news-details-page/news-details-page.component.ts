import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { News } from 'src/models/news';
import { NewsInMemoryService } from 'src/services/news-in-memory-service';

@Component({
    selector: 'app-news-details-page',
    templateUrl: './news-details-page.component.html',
    styleUrls: ['./news-details-page.component.scss']
})
export class NewsDetailsPageComponent implements OnInit {
    news: News;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private newsService: NewsInMemoryService) { }

    ngOnInit() {
        const url = this.route.snapshot.params.url;
        this.news = this.newsService.getNewsByUrl(url);
    }

    deleteClicked() {
        this.newsService.delete(this.news.id);
        this.router.navigateByUrl('');
    }
}
