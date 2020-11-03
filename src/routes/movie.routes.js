const express = require('express');

const router = express.Router();

const Movie = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    await res.json({movies});
});

router.post('/', async (req, res) => {
    const {title, description, cover_photo, main_photo, synopsis, language, rating, list_servers} = req.body;
    const movie = new Movie({title, description, cover_photo, main_photo, synopsis, language, rating, list_servers});
    await movie.save();
    await res.json({status: 'movie saved'});
});

router.put('/:id', async (req, res) => {
    const {title, description, cover_photo, main_photo, synopsis, language, rating, list_servers} = req.body;
    const new_movie = {title, description, cover_photo, main_photo, synopsis, language, rating, list_servers};
    await Movie.findByIdAndUpdate(req.params.id, new_movie);
    await res.json({status: 'movie updated'});
});

router.delete('/:id', async (req, res) => {
    await Movie.findByIdAndRemove(req.params.id);
    await res.json({status: 'movie deleted'});
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    await res.json({movie});
});

module.exports = router;
