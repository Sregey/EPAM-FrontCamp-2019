const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsScheme = new Schema(
    {
        title: String,
        text: String
    },
    { versionKey: false });

function NewsMongooseRepository() {
    const self = this;

    mongoose.connect('mongodb://localhost:27017/frontcamp', { useNewUrlParser: true, useUnifiedTopology: true });
    const News = mongoose.model('News', newsScheme);

    async function safeCall(promise) {
        return promise
        .catch((err) => {
            self.dispose();
            console.log(err);
        });
    }

    self.getAll = async () => {
        return safeCall(News.find({}));
    }

    self.find = async (id) => {
        return safeCall(News.findById(id));
    }

    self.add = async (newItem) => {
        safeCall(News.create(newItem));
    }

    self.addOrUpdate = async (item) => {
        safeCall(News.update({_id: item.id}, item, {upsert: true}));
    }

    self.remove = async (id) => {
        safeCall(News.findByIdAndDelete(id));
    }

    self.dispose = () => {
        mongoose.disconnect();
    }
}

module.exports = NewsMongooseRepository;
