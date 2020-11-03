const mongoose = require('mongoose');
const {Schema} = mongoose;

const MovieSchema = new Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    cover_photo: {type: String, required: false},
    main_photo: {type: String, required: false},
    synopsis: {type: String, required: true},
    language: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    list_servers: {type: [String], required: false},
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);