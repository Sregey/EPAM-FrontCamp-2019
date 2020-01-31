import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { News } from 'src/models/news';
import { NewsInMemoryService } from 'src/services/news-in-memory-service';
import { Source } from 'src/models/source';

@Component({
    selector: 'app-create-edit-news-page',
    templateUrl: './create-edit-news-page.component.html',
    styleUrls: ['./create-edit-news-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditNewsPageComponent implements OnInit {
    newsForm: FormGroup;
    title: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private newsService: NewsInMemoryService) { }

    get heading() { return this.newsForm.get('heading'); }
    get content() { return this.newsForm.get('content'); }
    get date() { return this.newsForm.get('date'); }
    get sourceUrl() { return this.newsForm.get('sourceUrl'); }

    ngOnInit() {
        const url = this.route.snapshot.params.url;

        let news: News;
        if (url) {
            this.title = 'Edit';
            news = this.newsService.getNewsByUrl(url);
        } else {
            this.title = 'Create';
            news = new News();
            news.date = new Date();
        }

        this.newsForm = new FormGroup({
            id: new FormControl(news.id),
            heading: new FormControl(news.title, Validators.required),
            description: new FormControl(news.description),
            content: new FormControl(news.text, Validators.required),
            image: new FormControl(news.imageUrl),
            date: new FormControl(news.date),
            author: new FormControl(news.author),
            sourceUrl: new FormControl(news.url, [Validators.required, Validators.pattern('[\\w,-]*')]),
        });
    }

    cancelClicked() {
        this.location.back();
    }

    saveClicked() {
        const formValue = this.newsForm.value;
        const newsItem = new News({
            id: formValue.id,
            title: formValue.heading,
            description: formValue.description,
            text: formValue.content,
            imageUrl: formValue.image,
            date: formValue.date,
            author: formValue.author,
            url: formValue.sourceUrl,
            source: Source.Local,
        });

        if (newsItem.id) {
            this.newsService.update(newsItem);
        } else {
            this.newsService.add(newsItem);
        }

        this.router.navigateByUrl('');
    }
}
