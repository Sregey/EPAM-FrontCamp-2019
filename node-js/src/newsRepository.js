function NewsRepository() {
    const news = [
        {
            id: 1,
            title: 'title 1',
            text: 'text 1',
        },
        {
            id: 2,
            title: 'title 2',
            text: 'text 2',
        }
    ];

    this.getAll = () => {
        return news;
    }

    this.find = (id) => {
        return news.find((elem) => elem.id == id);
    }

    this.add = (newItem) => {
        const newId = news[news.length - 1].id + 1;
        newItem.id = newId;
        news.push(newItem);
    }

    this.addOrUpdate = (item) => {
        const index = news.findIndex((elem) => elem.id == item.id);
        if (index !== -1) {
            news[index] = item;
        } else {
            news.push(item);
        }
    }

    this.remove = (id) => {
        const index = news.findIndex((elem) => elem.id == id);
        if (index !== -1) {
            news.splice(index, 1);
        }
    }
}

module.exports = NewsRepository;
