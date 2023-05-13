
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.DB_SONG_MODEL);
const callbackify = require("util").callbackify;

module.exports.artirstsGetAll = function(req, res) {
    const songId = req.params.songId;
    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }

    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec();
    });
    findWithCallback(songId, function(err, song) {
        const response = {};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        } else {
            _setInternalResponse(response, song.artists, parseInt(process.env.HTTP_RESPONSE_OK));
        }
        _sendResponse(response, res);
    });
}

module.exports.artirstsGetOne = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }
    if (!artistId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.ARTIST_ID_IS_MISSING});
        return;
    }

    const findWithCallback = callbackify(function(songId, artistId) {
        return Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec();
    });
    findWithCallback(songId, artistId, function(err, song) {
        const response = {};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        } else {
            const artist = song.artists.id(artistId);
            if (!artist) {
                _setInternalResponse(response, { message : process.env.ARTIST_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
            } else {
                _setInternalResponse(response, artist, parseInt(process.env.HTTP_RESPONSE_OK));
            }
        }
        _sendResponse(response, res);
    });
}

module.exports.artirstsAddOne = function(req, res) {
    const songId = req.params.songId;

    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }
    if (!req.body) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.PARAMETERS_ARE_MISSING});
        return;
    }

    // const artist = {
    //     name : req.body.name,
    //     age : parseInt(req.body.age)
    // };
    // const findAndUpdateWithCallback = callbackify(function(songId, artist) {
    //     return Song.findByIdAndUpdate({"_id" : songId}, {$push : {"artists" : artist}}).exec();
    // });
    // findAndUpdateWithCallback(songId, artist, function(err, response) {
    //     if (err) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //         return;
    //     } else {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
    //     }
    // });

    const addWithCallback = callbackify(function(songId) {
        return Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec();
    });
    addWithCallback(songId, function(err, song) {
        const response = {status:parseInt(process.env.HTTP_RESPONSE_OK), message:song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        }
        if (parseInt(process.env.HTTP_RESPONSE_OK) != response.status) {
            _sendResponse(response, res);
            return;
        }

        _addArtist(req, res, song, response);
    });
}

const _addArtist = function(req, res, song, response) {
    const artist = {
        name : req.body.name,
        age : parseInt(req.body.age, 10)
    };
    song.artists.push(artist);
    const saveWithCallback = callbackify(function(artist) {
        return song.save();
    });
    saveWithCallback(song, function(err, updatedSong) {
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else {
            _setInternalResponse(response, updatedSong, parseInt(process.env.HTTP_RESPONSE_CREATED));
        }
        _sendResponse(response, res);
    });
}

module.exports.artirstsPartialUpdateOne = function(req, res) {
    const partialUpdate = function(req, res, song, artistId, response) {
        const artist = song.artists.id(artistId);
        if (!artist) {
            _setInternalResponse(response, { message : process.env.ARTIST_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
            _sendResponse(response, res);
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

    // const songId = req.params.songId;
    // const artistId = req.params.artistId;
    // // const field_artists_name = process.env.FIELD_ARTISTS_NAME;
    // // const field_artists_age = process.env.FIELD_ARTISTS_AGE;
    // const updatedArtist = {
    //     "artists.$.name" : req.body.name,
    //     "artists.$.age" : req.body.age
    // };
    // console.log(updatedArtist, artistId);
    // const findWithCallback = callbackify(function(songId, artistId, updatedArtist) {
    //     // const field_id = process.env.FIELD_ID;
    //     // const field_artists_id = process.env.FIELD_ARTISTS_ID;
    //     return Song.findOneAndUpdate({ "_id" : songId, "artists._id" : artistId }, {$set : updatedArtist}).exec();
    //     //findByIdAndUpdate doesnot work in this case
    //     //findByIdAndUpdate calls findOneAndUpdate with filter _id
    // });
    // findWithCallback(songId, artistId, updatedArtist, function(err, song) {
    //     if (err) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //         return;
    //     } else if (!song) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
    //     } else {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({song});
    //     }
    // });
}

module.exports.artirstsFullUpdateOne = function(req, res) {
    const fullUpdate = function(req, res, song, artistId, response) {
        const artist = song.artists.id(artistId);
        if (!artist) {
            _setInternalResponse(response, { message : process.env.ARTIST_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
            _sendResponse(response, res);
            return;
        }
        artist.name = req.body.name;
        artist.age = parseInt(req.body.age, 10);
        _saveArtist(song, res, response);
    };
    _updateOne(req, res, fullUpdate);
    // const songId = req.params.songId;
    // const artistId = req.params.artistId;
    // // const field_artists_name = process.env.FIELD_ARTISTS_NAME;
    // // const field_artists_age = process.env.FIELD_ARTISTS_AGE;
    // const updatedArtist = {
    //     "artists.$.name" : req.body.name,
    //     "artists.$.age" : req.body.age
    // };
    // console.log(updatedArtist, artistId);
    // const findWithCallback = callbackify(function(songId, artistId, updatedArtist) {
    //     // const field_id = process.env.FIELD_ID;
    //     // const field_artists_id = process.env.FIELD_ARTISTS_ID;
    //     return Song.findOneAndUpdate({ "_id" : songId, "artists._id" : artistId }, {$set : updatedArtist}).exec();
    //     //findByIdAndUpdate doesnot work in this case
    //     //findByIdAndUpdate calls findOneAndUpdate with filter _id
    // });
    // findWithCallback(songId, artistId, updatedArtist, function(err, song) {
    //     if (err) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //         return;
    //     } else if (!song) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
    //     } else {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({song});
    //     }
    // });
    
    // const findSongWithCallback = callbackify(function(songId) {
    //     return Song.findById(songId).select("artists").exec();
    // });
    // findSongWithCallback(songId, function(err, song) {
    //     if (err) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //         return;
    //     } else {
    //         const artist = song.artists.id(req.params.artistId);
    //         if (artist) {
    //             artist.name = req.body.name;
    //             artist.age = parseInt(req.body.age);
    //             const saveWithCallback = callbackify(function(song) {
    //                 return song.save();
    //             });
    //             saveWithCallback(song, function(err, response) {
    //                 if (err) {
    //                     res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //                 } else {
    //                     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
    //                 }
    //             });
    //         } else {
    //             res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json({message : "Artist ID not found"});
    //         }
    //     }
    // });
}

const _updateOne = function(req, res, updateCallback) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }
    if (!artistId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.ARTIST_ID_IS_MISSING});
        return;
    }
    if (!req.body) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.PARAMETERS_ARE_MISSING});
        return;
    }

    const findSongWithCallback = callbackify(function(songId, artistId) {
        return Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec();
    });
    findSongWithCallback(songId, artistId, function(err, song) {
        const response = {status:parseInt(process.env.HTTP_RESPONSE_OK), message:song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        }
        if (parseInt(process.env.HTTP_RESPONSE_OK) != response.status) {
            _sendResponse(response, res);
            return;
        }

        updateCallback(req, res, song, artistId, response);
    });
}

const _saveArtist = function(song, res, response) {
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

module.exports.artirstsDeleteOne = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    if (!songId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.SONG_ID_IS_MISSING});
        return;
    }
    if (!artistId) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.ARTIST_ID_IS_MISSING});
        return;
    }

    // const deleteWithCallback = callbackify(function(songId, artistId) {
    //     const artists = process.env.COLLECTION_ARTISTS;
    //     return Song.findOneAndUpdate({"_id" : songId}, {$pull : {artists : {"_id" : artistId}}}).exec();
    // });
    // deleteWithCallback(songId, artistId, function(err, song) {
    //     if (err) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
    //         return;
    //     } else if (!song) {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
    //     } else {
    //         res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({song});
    //     }
    // });

    const findSongWithCallback = callbackify(function(songId, artistId) {
        return Song.findById(songId).select(process.env.DB_ARTISTS_COLLECTION).exec();
    });
    findSongWithCallback(songId, artistId, function(err, song) {
        const response = {status:parseInt(process.env.HTTP_RESPONSE_OK), message:song};
        if (err) {
            _setInternalResponse(response, err, parseInt(process.env.HTTP_RESPONSE_ERROR));
        } else if (!song) {
            _setInternalResponse(response, { message : process.env.SONG_ID_NOT_FOUND_MESSAGE}, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND));
        }
        if (parseInt(process.env.HTTP_RESPONSE_OK) != response.status) {
            _sendResponse(response, res);
            return;
        }

        _removeArtist(res, artistId, song, response);
    });
}

const _removeArtist = function(res, artistId, song, response) {
    song.artists.pull({_id : artistId});

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

