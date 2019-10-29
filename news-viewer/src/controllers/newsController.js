export default class NewsController {
    constructor() {
    }

    /*private*/ buildNewsRequest(endpoint, params) {
        if (!endpoint)
            throw new Error('Invalid endpoint');
    
        let url = `https://newsapi.org/v2/${endpoint}`;
        if (params) {
            url += '?' + Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
        }
    
        const request = new Request(url);
        request.headers.set('X-Api-Key', '147d0842a27e4dc88c966d48f1b40e46');
        return request;
    }
    
    async getSources() {
        const request = this.buildNewsRequest('sources');
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Can\'t load sources.');
        }
    }
    
    async getNews(routeParams) {
        const request = this.buildNewsRequest('top-headlines', {sources: routeParams.id});
        const response = await fetch(request);

        let data = null;
        if (response.ok) {
            data = await response.json();
        }

        if (data && data.articles.length > 0) {
            return data;
        } else {
            throw new Error(`Can\'t find source with \'${routeParams.id}\' id.`);
        }
    }
}
