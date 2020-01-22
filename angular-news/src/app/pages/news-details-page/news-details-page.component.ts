import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from 'src/models/news';
import { NewsService } from 'src/services/news-service';

@Component({
  selector: 'app-news-details-page',
  templateUrl: './news-details-page.component.html',
  styleUrls: ['./news-details-page.component.scss']
})
export class NewsDetailsPageComponent implements OnInit {
  news: News;

  constructor(
      private route: ActivatedRoute,
      private newsService: NewsService) { }

  ngOnInit() {
    const url = this.route.snapshot.params['url'];
    this.news = this.newsService.getNewsBySourceUrl(url);
  }

  deleteClicked(){
    console.log('Deleted');
  }
}
