const NewsMemoryRepository = require('./newsMemoryRepository.js');
const NewsMongooseRepository = require('./newsMongooseRepository.js');

const NewsRepositoriesFactory = (function() {
    const factory = {};
    let mode = 'memory';
    let memoryRepository;

    factory.setMode = (value) => {
        mode = value;
    };

    factory.create = () => {
        if (mode === 'memory') {
            if (!memoryRepository) {
                memoryRepository = new NewsMemoryRepository();
            }
            return memoryRepository;
        } else if (mode === 'mongoose') {
            return new NewsMongooseRepository();
        }
    };

    return factory;
})();

module.exports = NewsRepositoriesFactory;
