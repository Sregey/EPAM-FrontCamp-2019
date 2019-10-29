export default class NewsTemplate {
    static getSourcesView(model) {
        let sourcesContainer = document.createDiv('sources-container');

        for (let source of model.sources) {
            sourcesContainer.append(
                document.createLink('source', source.name, `#sources/${source.id}`)
            );
        }

        return sourcesContainer;
    }

    static getNewsListView(model) {
        let newsContainer = document.createDiv();

        for (let article of model.articles) {
            let image = document.createElementWithClass('img');
            image.setAttribute('src', article.urlToImage);

            let publishedAt = new Date(article.publishedAt);

            newsContainer.append(
                document.createDiv('news').add(
                    document.createDiv('title', article.title),
                    document.createDiv('body').add(
                        document.createDiv('image').add(
                            image
                        ),
                        document.createDiv('description').add(
                            article.author ? document.createDiv(null, `Authors: ${article.author}`) : null,
                            document.createDiv(null, `Published: ${publishedAt.toLocaleDateString()} ${publishedAt.toLocaleTimeString()}`),
                            document.createParagraph(null, article.content),
                            document.createParagraph().add(
                                document.createLink(null, 'read more here', article.url)
                            )
                        )
                    )
                ));
        }

        return newsContainer;
    }

    static getNotFoundView() {
        return document.createDiv(null, '404');
    }
}