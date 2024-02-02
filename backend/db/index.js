const mongoose= require('mongoose');


const dataSchema= new mongoose.Schema({
    end_year:  mongoose.Schema.Types.Mixed,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year:  mongoose.Schema.Types.Mixed,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});
const DataModel = mongoose.model('Data', dataSchema);

module.exports = {
    DataModel
};