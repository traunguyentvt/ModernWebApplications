
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.DB_SONG_MODEL);

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
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.QUERYSTRING_OFFSET_COUNT_SHOULD_BE_NUMBERS}}, res);
        return;
    }

    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (count > maxCount) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.CANNOT_EXCEED_COUNT_OF_MESSAGE + maxCount}}, res);
        return;
    }
    
    let query = {};
    if (req.query && req.query.keySearch) {
        query = {
            title: {$regex: req.query.keySearch}
        };
    }

    const response = {};
    Song.find(query).skip(offset*count).limit(count).exec().then(function(songs) {
        _setInternalResponse(response, songs, parseInt(process.env.HTTP_RESPONSE_OK, 10));
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.getOne = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).exec().then(function(song) {
        if (!song) {
            _setInternalResponse(response, {message:process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
        } else {
            _setInternalResponse(response, song, parseInt(process.env.HTTP_RESPONSE_OK, 10));
        }
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.addOne = function(req, res) {
    if (!req.body) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.PARAMETERS_ARE_MISSING}}, res);
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

    const response = {};
    Song.create(newSong).then(function(song) {
        _setInternalResponse(response, song, parseInt(process.env.HTTP_RESPONSE_CREATED, 10));
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.deleteOne = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findByIdAndDelete(songId).exec().then(function(song) {
        if (!song) {
            _setInternalResponse(response, {message:process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
        } else {
            _setInternalResponse(response, song, parseInt(process.env.HTTP_RESPONSE_OK, 10));
        }
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

const _updateOne = function(req, res, updateCallback) {
    const songId = req.params.songId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }
    if (!req.body) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.PARAMETERS_ARE_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).exec().then(function(song) {
        if (!song) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_ERROR, 10), message:{message:process.env.SONG_ID_NOT_FOUND_MESSAGE}}, res);
        } else {
            updateCallback(req, res, song, response);
        }
    })
    .catch(function(error) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_ERROR, 10), message:error}, res);
    })
    .finally(function() {

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
    song.save().then(function(updatedSong) {
        _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_OK));
    })
    .catch(function(error) {
        _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
    })
    .finally(function() {
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