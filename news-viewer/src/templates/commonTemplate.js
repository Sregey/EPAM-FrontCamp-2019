export default class CommonTemplate {
    static getNotFoundView(message) {
        let notFound = document.createDiv('not-found');
        notFound.innerHTML = `404<br>${message}`;
        return notFound;
    }
}
