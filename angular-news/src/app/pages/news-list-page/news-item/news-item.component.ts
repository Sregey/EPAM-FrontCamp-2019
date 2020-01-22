import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: any;

  constructor() { }

  ngOnInit() {
  }

  deleteClicked(){
    console.log('Deleted');
  }
}
