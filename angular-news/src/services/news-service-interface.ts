import { Observable } from 'rxjs';

import { NewsFilter } from 'src/models/news-filter';
import { News } from 'src/models/news';

export interface INewsService {
    getNews(filter: NewsFilter): Observable<News[]>;
}
