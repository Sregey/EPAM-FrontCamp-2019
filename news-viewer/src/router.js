import CommonTemplate from './templates/commonTemplate.js'

export default class Router {
    constructor() {
        this.routes = {};

        window.addEventListener('load', (e) => this.router(e));
        window.addEventListener('hashchange', (e) => this.router(e));
    }

    resolveRoute(url) {
        let routeParams = {};
        for (let route of Object.keys(this.routes)) {
            let paramNames = [];
            let reg = route.replace(/{([\w-]+)}/g, function(match, token) {
                paramNames.push(token);
                return '([\\w-]+)';
            });
            let regexp = new RegExp(`^${reg}$`);
            let match = url.match(regexp);
            if (match) {
                routeParams = {};
                for (let i = 0; i < paramNames.length; i++) {
                    routeParams[paramNames[i]] = match[i+1];
                }
                let result = this.routes[route];
                result.routeParams = routeParams;
                return result;
            }
        }

        throw new Error('No suitable route.');
    };

    async router(e) {
        let app = document.getElementById('app');
        if (!app) {
            document.body.innerHTML = '';
            app = document.createElement('div');
            app.id = 'app';
            document.body.append(app);
        } else {
            app.innerHTML = '';
        }

        try {
            let url = '/' + location.hash.slice(1);
            let route = this.resolveRoute(url);
            if (route && route.controller && route.template) {
                const model = await route.controller(route.routeParams);
                const view = route.template(model);
                app.append(view);
            }
        } catch(e) {
            app.append(CommonTemplate.getNotFoundView(e.message));
        }
    };

    route(paths, controller, template) {
        if (typeof paths === 'string') {
            this.routes[paths] = {controller, template};
        } else if (Array.isArray(paths)) {
            for (let path of paths) {
                this.routes[path] = {controller, template};
            }
        }
    };
}
