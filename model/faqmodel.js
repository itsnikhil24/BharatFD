const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/faq")

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: { type: Map, of: Object, default: {} } // Store translations here
});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
