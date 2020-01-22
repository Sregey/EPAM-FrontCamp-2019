import { Component } from '@angular/core';
import { NewsService } from 'src/services/news-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NewsService]
})
export class AppComponent {
  title: string;

  constructor(private route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
  }
}
