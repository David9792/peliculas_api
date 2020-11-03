const express = require('express');

const router = express.Router();

const Movie = require('../models/movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        await res.json({movies});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const {title, description, synopsis, language, rating, list_servers} = req.body;
        const movie = new Movie({title, description, synopsis, language, rating, list_servers});
        await movie.save();
        await res.json({status: 'movie saved'});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {title, description, cover_photo, main_photo, synopsis, language, rating, list_servers} = req.body;
        const new_movie = {title, description, cover_photo, main_photo, synopsis, language, rating, list_servers};
        await Movie.findByIdAndUpdate(req.params.id, new_movie);
        await res.json({status: 'movie updated'});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndRemove(req.params.id);
        await res.json({status: 'movie deleted'});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        await res.json({movie});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/upload-cover-photo/:id', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "cover_photo") to retrieve the uploaded file
            let cover_photo = req.files.cover_photo;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            cover_photo.mv('./uploads/cover-photos/' + cover_photo.name);

            Movie.update({_id: req.params.id}, {
                cover_photo: cover_photo.name,
            }, function (err, affected, resp) {
                console.log(resp);
            })

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: cover_photo.name,
                    mimetype: cover_photo.mimetype,
                    size: cover_photo.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/upload-main-photo/:id', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "cover_photo") to retrieve the uploaded file
            let main_photo = req.files.main_photo;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            main_photo.mv('./uploads/main-photos/' + main_photo.name);

            Movie.update({_id: req.params.id}, {
                main_photo: main_photo.name,
            }, function (err, affected, resp) {
                console.log(resp);
            })

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: main_photo.name,
                    mimetype: main_photo.mimetype,
                    size: main_photo.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
