const mongoose = require('mongoose');

// Define trip schema
const newsSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true, index: true },
    link: { type: String, required: true },
    author: { type: String, required: false },
    publishDate: { type: String, required: false },
    image: { type: String, required: false },
    alt: { type: String, required: false },
    content: { type: String, required: false }
});

const News = mongoose.model('news', newsSchema);
module.exports = News
