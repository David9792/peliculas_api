const mongoose = require('mongoose');
const {Schema} = mongoose;

const MovieSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    cover_photo: {type: String, required: true},
    main_photo: {type: String, required: true},
    synopsis: {type: String, required: true},
    language: {type: String, required: true},
    rating: {type: Number, required: true},
    list_servers: {type: [String], required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);