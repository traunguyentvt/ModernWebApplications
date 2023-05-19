
const mongoose= require("mongoose");
const Song= mongoose.model(process.env.DB_SONG_MODEL);
const helpers= require("../helpers");

module.exports.artirstsGetAll= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => helpers.setDataToRequestSuccess(response, song.artists))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.artirstsGetOne= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    const artistId= req.params.artistId;
    if (!artistId) {
        helpers.setMessageToBadRequest(response, process.env.ARTIST_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => helpers.checkArtistExists(response, song, artistId))
        .then((artist) => helpers.setDataToRequestSuccess(response, artist))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.artirstsAddOne= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    if (!req.body) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(response, res);
        return;
    }
    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => _addArtist(req, song))
        .then((updatedSong) => helpers.setDataToCreatedSuccess(response, updatedSong))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _addArtist= function(req, song) {
    const artist= {
        name: req.body.name,
        age: parseInt(req.body.age, 10)
    };
    song.artists.push(artist);

    return song.save();
}

module.exports.artirstsPartialUpdateOne= function(req, res) {
    const _partialUpdate= function(req, song, artistId) {
        const artist= song.artists.id(artistId);
        if (req.body.name) {
            artist.name= req.body.name;
        }
        if (req.body.age) {
            artist.age= parseInt(req.body.age, 10);
        }
        
        return song.save()
    };
    _updateOne(req, res, _partialUpdate);
}

module.exports.artirstsFullUpdateOne= function(req, res) {
    const _fullUpdate= function(req, song, artistId) {
        const artist= song.artists.id(artistId);
        artist.name= req.body.name;
        artist.age= parseInt(req.body.age, 10);

        return song.save();
    };
    _updateOne(req, res, _fullUpdate);
}

const _updateOne= function(req, res, _updateCallback) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    const artistId= req.params.artistId;
    if (!artistId) {
        helpers.setMessageToBadRequest(response, process.env.ARTIST_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    if (!req.body) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => _checkValidArtist(response, song, artistId))
        .then((song) => _updateCallback(req, song, artistId))
        .then((updatedSong) => helpers.setDataToRequestSuccess(response, updatedSong))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _checkValidArtist= function(response, song, artistId) {
    const artist= song.artists.id(artistId);
    return new Promise((resolve, reject) => {
        if (!artist) {
            response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
            reject({message:process.env.ARTIST_ID_NOT_FOUND_MESSAGE});
        } else {
            resolve(song);
        }
    });
}

module.exports.artirstsDeleteOne= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    const artistId= req.params.artistId;
    if (!artistId) {
        helpers.setMessageToBadRequest(response, process.env.ARTIST_ID_IS_MISSING);
        helpers.sendResponse(response, res);
        return;
    }

    Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => _removeArtist(artistId, song))
        .then((updatedSong) => helpers.setDataToRequestSuccess(response, updatedSong))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _removeArtist= function(artistId, song) {
    song.artists.pull({_id: artistId});
    return song.save();
}