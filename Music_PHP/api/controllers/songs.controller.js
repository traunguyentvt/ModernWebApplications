
const mongoose= require("mongoose");

const Song= mongoose.model(process.env.DB_SONG_MODEL);
const helpers= require("../helpers");

module.exports.getAll= function(req, res) {
    let offset= parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count= parseInt(process.env.DEFAULT_FIND_COUNT, 10);

    if (req.query && req.query.offset) {
        offset= parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count= parseInt(req.query.count, 10);
    }

    const response= helpers.createRespone();

    if (isNaN(offset) || isNaN(count)) {
        helpers.setMessageToBadRequest(response, process.env.QUERYSTRING_OFFSET_COUNT_SHOULD_BE_NUMBERS);
        helpers.sendResponse(res, response);
        return;
    }

    const maxCount= parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (count > maxCount) {
        helpers.setMessageToBadRequest(response, process.env.CANNOT_EXCEED_COUNT_OF_MESSAGE+maxCount);
        helpers.sendResponse(res, response);
        return;
    }
    
    const query= {};
    if (req.query && req.query.keySearch) {
        query.title= {$regex: req.query.keySearch, $options: process.env.FILTER_OPTION};
    }

    const sort_query = {};
    let sort = parseInt(process.env.DEFAULT_SORT, 10);
    if (req.query && req.query.sort) {
        sort= parseInt(req.query.sort, 10);
    }
    if (parseInt(process.env.DEFAULT_SORT_VALUE, 10) == sort) {
        sort_query.title = sort;
    }

    Song.find(query).sort(sort_query).skip(offset*count).limit(count).exec()
        .then((songs) => helpers.setDataToRequestSuccess(response, songs))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.getOne= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    Song.findById(songId).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => helpers.setDataToRequestSuccess(response, song))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.addOne= function(req, res) {
    const response= helpers.createRespone();

    if (!req.body) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    const newSong= {
        title: req.body.title,
        duration: parseInt(req.body.duration, 10),
        artists: []
    };
    if (req.body.artists) {
        newSong.artists= req.body.artists;
    }

    Song.create(newSong)
        .then((song) => helpers.setDataToCreatedSuccess(response, song))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.deleteOne= function(req, res) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    Song.findByIdAndDelete(songId).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => helpers.setDataToRequestSuccess(response, song))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _updateOne= function(req, res, _updateCallback) {
    const response= helpers.createRespone();

    let songId;
    if (req.params && req.params.songId) {
        songId= req.params.songId;
    }
    if (!songId) {
        helpers.setMessageToBadRequest(response, process.env.SONG_ID_IS_MISSING);
        helpers.sendResponse(res, response);
        return;
    }
    if (!req.body) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    Song.findById(songId).exec()
        .then((song) => helpers.checkSongExists(response, song))
        .then((song) => _updateCallback(req, song))
        .then((savedSong) => helpers.setDataToRequestSuccess(response, savedSong))
        .catch((error) => helpers.setDataToInternalError(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

module.exports.fullUpdateOne= function(req, res) {
    const _fullUpdate= function(req, song) {
        song.title= req.body.title;
        song.duration= parseInt(req.body.duration, 10);
        if (req.body.artists) {
            song.artists= req.body.artists;
        }
        return song.save();
    };
    _updateOne(req, res, _fullUpdate);
}

module.exports.partialUpdateOne= function(req, res) {
    const _partialUpdate= function(req, song) {
        if (req.body.title) {
            song.title= req.body.title;
        }
        if (req.body.duration) {
            song.duration= parseInt(req.body.duration, 10);
        }
        if (req.body.artists) {
            song.artists= req.body.artists;
        }
        return song.save();
    };
    _updateOne(req, res, _partialUpdate);
}
