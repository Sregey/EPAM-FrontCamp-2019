import 'whatwg-fetch';

import './helpers/domHelper.js'
import './helpers/polyfills.js'

import Router from './router.js'
import NewsController from './controllers/newsController.js'
import NewsTemplate from './templates/newsTemplate.js'

import './styles/app.scss';

const newsController = new NewsController();

const router = new Router();
router.route(['/', '/sources'],
    () => newsController.getSources(),
    (model) => NewsTemplate.getSourcesView(model));

router.route('/sources/{id}',
    (routeParams) => newsController.getNews(routeParams),
    (model) => NewsTemplate.getNewsListView(model));
