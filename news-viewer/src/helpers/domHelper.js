Document.prototype.createElementWithClass = function(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className)
        element.className = className;
    if (text)
        element.innerText = text;
    return element;
};

Document.prototype.createDiv = function(className, text) {
    return document.createElementWithClass('div', className, text);
};

Document.prototype.createParagraph = function(className, text) {
    return document.createElementWithClass('p', className, text);
};

Document.prototype.createLink = function(className, text, url) {
    let link = document.createElementWithClass('a', className, text);
    link.setAttribute('href', url);
    return link;
};

// Fluent version of append function.
Node.prototype.add = function() {
    let notNullArguments = [];
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i])
            notNullArguments.push(arguments[i]);
    }

    this.append.apply(this, notNullArguments);
    return this;
}
