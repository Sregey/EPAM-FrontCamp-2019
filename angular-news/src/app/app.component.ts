import { Component } from '@angular/core';
import { NewsInMemoryService } from 'src/services/news-in-memory-service';
import { NewsApiService } from 'src/services/news-api-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [NewsInMemoryService, NewsApiService]
})
export class AppComponent { }
