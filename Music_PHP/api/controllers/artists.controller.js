
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.DB_SONG_MODEL);

module.exports.artirstsGetAll = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec().then(function(song) {
        if (!song) {
            _setInternalResponse(response, {message:process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
        } else {
            _setInternalResponse(response, song.artists, parseInt(process.env.HTTP_RESPONSE_OK, 10));
        }
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.artirstsGetOne = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }
    if (!artistId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.ARTIST_ID_IS_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec().then(function(song) {
        if (!song) {
            _setInternalResponse(response, {message:process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
        } else {
            const artist = song.artists.id(artistId);
            if (!artist) {
                _setInternalResponse(response, {message:process.env.ARTIST_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
            } else {
                _setInternalResponse(response, artist, parseInt(process.env.HTTP_RESPONSE_OK, 10));
            }
        }
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.artirstsAddOne = function(req, res) {
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
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec().then(function(song) {
        if (!song) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), message:{message:process.env.SONG_ID_NOT_FOUND_MESSAGE}}, res);
        } else {
            _addArtist(req, res, song, response);
        }
    })
    .catch(function(error) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_ERROR, 10), message:error}, res);
    })
    .finally(function() {

    });
}

const _addArtist = function(req, res, song, response) {
    const artist = {
        name : req.body.name,
        age : parseInt(req.body.age, 10)
    };
    song.artists.push(artist);

    song.save().then(function(updatedSong) {
        _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_CREATED, 10));
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
}

module.exports.artirstsPartialUpdateOne = function(req, res) {
    const partialUpdate = function(req, res, song, artistId, response) {
        const artist = song.artists.id(artistId);
        if (!artist) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), message:{message:process.env.ARTIST_ID_NOT_FOUND_MESSAGE}}, res);
            return;
        }
        if (req.body.name) {
            artist.name = req.body.name;
        }
        if (req.body.age) {
            artist.age = parseInt(req.body.age, 10);
        }
        _saveArtist(song, res, response);
    };
    _updateOne(req, res, partialUpdate);
}

module.exports.artirstsFullUpdateOne = function(req, res) {
    const fullUpdate = function(req, res, song, artistId, response) {
        const artist = song.artists.id(artistId);
        if (!artist) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), message:{message:process.env.ARTIST_ID_NOT_FOUND_MESSAGE}}, res);
            return;
        }
        artist.name = req.body.name;
        artist.age = parseInt(req.body.age, 10);
        _saveArtist(song, res, response);
    };
    _updateOne(req, res, fullUpdate);
}

const _updateOne = function(req, res, updateCallback) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }
    if (!artistId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.ARTIST_ID_IS_MISSING}}, res);
        return;
    }
    if (!req.body) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.PARAMETERS_ARE_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec().then(function(song) {
        if (!song) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), message:{message:process.env.SONG_ID_NOT_FOUND_MESSAGE}}, res);
        } else {
            updateCallback(req, res, song, artistId, response);
        }
    })
    .catch(function(error) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_ERROR, 10), message:error}, res);
    })
    .finally(function() {

    });
}

const _saveArtist = function(song, res, response) {
    song.save().then(function(updatedSong) {
        _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_OK, 10));
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
    })
    .finally(function() {
        _sendResponse(response, res);
    });
    const saveWithCallback = callbackify(function(song) {
        return song.save();
    });
}

module.exports.artirstsDeleteOne = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    if (!songId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.SONG_ID_IS_MISSING}}, res);
        return;
    }
    if (!artistId) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_400, 10), message:{message:process.env.ARTIST_ID_IS_MISSING}}, res);
        return;
    }

    const response = {};
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec().then(function(song) {
        if (!song) {
            _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), message:{message:process.env.SONG_ID_NOT_FOUND_MESSAGE}}, res);
        } else {
            _removeArtist(res, artistId, song, response);
        }
    })
    .catch(function(error) {
        _sendResponse({status:parseInt(process.env.HTTP_RESPONSE_ERROR, 10), message:error}, res);
    })
    .finally(function() {

    });
}

const _removeArtist = function(res, artistId, song, response) {
    song.artists.pull({_id : artistId});

    song.save().then(function(updatedSong) {
        _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_OK, 10));
    })
    .catch(function(error) {
        _setInternalResponse(response, error, parseInt(process.env.HTTP_RESPONSE_ERROR, 10));
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

