const mongoose = require("mongoose");
const Movie = mongoose.model(process.env.MOVIE_MODEL);

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"QueryString offset & count should be numbers"});
        return;
    }
    const maxCount = 15;
    if (count > maxCount) {
        res.status(500).json({message:"Cannot exceed of the count " + maxCount});
        return;
    }

    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };

    Movie.find().skip(offset*count).limit(count).exec().then((movies)=>{
        response.message= movies;
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const movieId = req.params.movieId;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Movie.findById(movieId).exec().then((movie)=>{
        if (!movie) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        } else {
            response.message= movie;
        }
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const deleteOne = function(req, res) {
        let movieId;
        if (req.params && req.params.movieId) {
            movieId = req.params.movieId;
        }
        if (!movieId) {
            res.status(500).json({message:"There is missing movieId"});
            return;
        }
        
        Movie.findByIdAndDelete(movieId).exec().then(function(movie) {
            if (!movie) {
                res.status(404).json({message:"Cannot find the movie with this movieId"});
            } else {
                res.status(200).json(movie);
            }
        }).catch(function(error) {
            res.status(500).json(error);
        });
    }


module.exports = {
    getAll,
    getOne,
    deleteOne,
};