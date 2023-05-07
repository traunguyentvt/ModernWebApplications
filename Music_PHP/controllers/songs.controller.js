
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.SONG_MODEL);
const callbackify = require("util").callbackify;

module.exports.getAll = function(req, res) {
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.QUERYSTRING_OFFSET_COUNT_SHOULD_BE_NUMBERS});
        return;
    }

    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (count > maxCount) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.CANNOT_EXCEED_COUNT_OF_MESSAGE});
        return;
    }

    const findWithCallback = callbackify(function(offset, limit) {
        return Song.find().skip(offset).limit(count).exec();
    });
    findWithCallback(offset, count, function(err, songs) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(songs);
        }
    });
}

module.exports.getOne = function(req, res) {
    const songId = req.params.songId;
    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).exec();
    });
    findWithCallback(songId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(song);
        }
    });
}

module.exports.addOne = function(req, res) {
    const newSong = {
        title : req.body.title,
        duration : req.body.duration,
        artists : []
    };
    const addWithCallback = callbackify(function(newSong) {
        return Song.create(newSong);
    });
    addWithCallback(newSong, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(song);
        }
    });
}

module.exports.fullUpdateOne = function(req, res) {
    const songId = req.params.songId;
    const updatedSong = {
        title : req.body.title,
        duration : req.body.duration
    };
    const fullUpdateWithCallback = callbackify(function(songId, updatedSong) {
        return Song.findByIdAndUpdate(songId, updatedSong).exec();
    });
    fullUpdateWithCallback(songId, updatedSong, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            updatedSong._id = songId;
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({result : process.env.HTTP_RESULT});
        }
    });
}

module.exports.partialUpdateOne = function(req, res) {

}

module.exports.deleteOne = function(req, res) {
    const songId = req.params.songId;
    const deleteWithCallback = callbackify(function(songId) {
        return Song.findByIdAndDelete(songId).exec();
    });
    deleteWithCallback(songId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({result : process.env.HTTP_RESULT});
        }
    });
}
