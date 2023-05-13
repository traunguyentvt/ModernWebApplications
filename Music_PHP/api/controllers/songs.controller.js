
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.DB_SONG_MODEL);
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
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.CANNOT_EXCEED_COUNT_OF_MESSAGE + maxCount});
        return;
    }
    
    let query = {};
    if (req.query && req.query.keySearch) {
        query = {
            title: {$regex: req.query.keySearch}
        };
    }

    const findWithCallback = callbackify(function(offset, limit) {
        return Song.find(query).skip(offset*count).limit(count).exec();
    });
    findWithCallback(offset, count, function(err, songs) {
        const response = {status: parseInt(process.env.HTTP_RESPONSE_OK), message : songs};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        }
        _sendResponse(response, res);
    });
}

module.exports.getOne = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }

    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).exec();
    });
    findWithCallback(songId, function(err, song) {
        const response = {status: parseInt(process.env.HTTP_RESPONSE_OK), message : song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        }
        _sendResponse(response, res);
    });
}

module.exports.addOne = function(req, res) {
    if (!req.body) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.PARAMETERS_ARE_MISSING});
        return;
    }

    const newSong = {
        title : req.body.title,
        duration : parseInt(req.body.duration, 10),
        artists : []
    };
    if (req.body.artists) {
        newSong.artists = req.body.artists;
    }

    const addWithCallback = callbackify(function(newSong) {
        return Song.create(newSong);
    });
    addWithCallback(newSong, function(err, song) {
        const response = {status: parseInt(process.env.HTTP_RESPONSE_CREATED), message : song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        }
        _sendResponse(response, res);
    });
}

module.exports.deleteOne = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }

    const deleteWithCallback = callbackify(function(songId) {
        return Song.findByIdAndDelete(songId).exec();
    });
    deleteWithCallback(songId, function(err, song) {
        const response = {status: parseInt(process.env.HTTP_RESPONSE_OK), message : song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        }
        _sendResponse(response, res);
    });
}

const _updateOne = function(req, res, updateCallback) {
    const songId = req.params.songId;
    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }
    if (!req.body) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.PARAMETERS_ARE_MISSING});
        return;
    }

    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).exec();
    });
    findWithCallback(songId, function(err, song) {
        const response = {status: parseInt(process.env.HTTP_RESPONSE_OK), message : song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        }
        if (parseInt(process.env.HTTP_RESPONSE_OK) != response.status) {
            _sendResponse(response, res);
            return;
        }
        updateCallback(req, res, song, response);
    });
}

module.exports.fullUpdateOne = function(req, res) {
    const fullUpdate = function(req, res, song, response) {
        song.title = req.body.title;
        song.duration = parseInt(req.body.duration, 10);
        song.artists = req.body.artists;

        _saveSong(res, song, response);
    };
    _updateOne(req, res, fullUpdate);
}

module.exports.partialUpdateOne = function(req, res) {
    const partialUpdate = function(req, res, song, response) {
        if (req.body.title) {
            song.title = req.body.title;
        }
        if (req.body.duration) {
            song.duration = parseInt(req.body.duration, 10);
        }
        if (req.body.artists) {
            song.artists = req.body.artists;
        }

        _saveSong(res, song, response);
    };
    _updateOne(req, res, partialUpdate);
}

const _saveSong = function(res, song, response) {
    const saveWithCallback = callbackify(function(song) {
        return song.save();
    });
    saveWithCallback(song, function(err, updatedSong) {
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else {
            _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_OK));
        }
        _sendResponse(response, res);
    });
}

const _setInternalResponse = function(response, data, code) {
    response.status = code;
    response.message = data;
}

const _sendResponse = function(response, res) {
    res.status(response.status).json(response.message);
}