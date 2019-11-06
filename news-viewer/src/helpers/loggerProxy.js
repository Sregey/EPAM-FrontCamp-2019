export default function createLoggerProxy(target, methodLoggers) {
    const handler = {
        get(target, propKey) {
            const origMethod = target[propKey];
            return async function (...args) {
                const result = await origMethod.apply(this, args);
                if (methodLoggers[propKey]) {
                    methodLoggers[propKey](result);
                }
                return result;
            };
        }
    };
    return new Proxy(target, handler);
}

export const newsControllerMathodLoggers = {
    getSources: (model) => {
        console.log(`${model.sources.length} sources are loaded.`);
    },
    getNews: (model) => {
        console.log(`${model.articles.length} news are loaded.`);
    }
}
