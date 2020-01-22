import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { News } from 'src/models/news';
import { NewsService } from 'src/services/news-service';

@Component({
  selector: 'app-create-edit-news-page',
  templateUrl: './create-edit-news-page.component.html',
  styleUrls: ['./create-edit-news-page.component.scss']
})
export class CreateEditNewsPageComponent implements OnInit {
  newsForm: FormGroup;
  title: string;

  constructor(
      private route: ActivatedRoute,
      private location: Location,
      private newsService: NewsService) { }

  get heading() { return this.newsForm.get('heading'); }
  get content() { return this.newsForm.get('content'); }
  get date() { return this.newsForm.get('date'); }

  ngOnInit() {
    const url = this.route.snapshot.params['url'];

    let news: News;
    if (url) {
        this.title = 'Edit';
        news = this.newsService.getNewsBySourceUrl(url);
    } else {
        this.title = 'Create';
        news = new News();
    }

    this.newsForm = new FormGroup({
        id: new FormControl(news.id),
        heading: new FormControl(news.title, Validators.required),
        description: new FormControl(news.description),
        content: new FormControl(news.text, Validators.required),
        image: new FormControl(news.imageUrl),
        date: new FormControl(news.date),
        author: new FormControl(news.author),
        sourceUrl: new FormControl(news.sourceUrl, Validators.required),
      });
  }

  cancelClicked() {
    this.location.back();
  }

  saveClicked() {
      console.log(this.date.value);
    console.log(this.newsForm.value);
  }
}
