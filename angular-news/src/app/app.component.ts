import { Component } from '@angular/core';
import { NewsService } from 'src/services/news-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [NewsService]
})
export class AppComponent { }
