import { Component, Input } from '@angular/core';

import { News } from 'src/models/news';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
    @Input() newsItem: News;
    @Input() onDelete: (newsId: number) => void;

    deleteClicked() {
        this.onDelete(this.newsItem.id);
    }
}
