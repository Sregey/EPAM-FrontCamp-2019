const apiEndpoint = 'https://reactjs-cdp.herokuapp.com/';

export default class MovieSevice {
    buildRequest(path, params) {
        let url = apiEndpoint;
        if (path) {
            url += path;
        }
        if (params) {
            url += '?' + Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
        }

        return new Request(url);
    }

    async getMovies(params) {
        const request = await this.buildRequest('movies', params);
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error('Can\'t load data.');
        }
    }

    async getMovie(id) {
        const request = `${apiEndpoint}movies/${id}`;
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Can\'t load data.');
        }
    }
}