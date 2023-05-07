
const mongoose = require("mongoose");
const Song = mongoose.model(process.env.SONG_MODEL);
const callbackify = require("util").callbackify;

module.exports.artirstsGetAll = function(req, res) {
    const songId = req.params.songId;
    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).select(process.env.COLLECTION_ARTISTS).exec();
    });
    findWithCallback(songId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(song.artists);
        }
    });
}

module.exports.artirstsGet = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    const findWithCallback = callbackify(function(songId, artistId) {
        return Song.findById(songId).select(process.env.COLLECTION_ARTISTS).exec();
    });
    findWithCallback(songId, artistId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            const artist = song.artists.id(artistId);
            if (!artist) {
                res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.ARTIST_ID_NOT_FOUND_MESSAGE});
            } else {
                res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(artist);
            }
        }
    });
}

module.exports.artirstsAdd = function(req, res) {
    const songId = req.params.songId;

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
        return Song.findById(songId).select(process.env.COLLECTION_ARTISTS).exec();
    });
    addWithCallback(songId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            addArtist(req, res, song);
        }
    });
}

module.exports.artirstsUpdate = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;
    const field_artists_name = process.env.FIELD_ARTISTS_NAME;
    const field_artists_age = process.env.FIELD_ARTISTS_AGE;
    const updatedArtist = {
        field_artists_name : req.body.name,
        field_artists_age : req.body.age
    };
    console.log(updatedArtist, artistId);
    const findWithCallback = callbackify(function(songId, artistId, updatedArtist) {
        const field_id = process.env.FIELD_ID;
        const field_artists_id = process.env.FIELD_ARTISTS_ID;
        return Song.findOneAndUpdate({ field_id : songId, field_artists_id : artistId }, {$set : updatedArtist}).exec();
        //findByIdAndUpdate doesnot work in this case
        //findByIdAndUpdate calls findOneAndUpdate with filter _id
    });
    findWithCallback(songId, artistId, updatedArtist, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({result : process.env.HTTP_RESULT});
        }
    });
    
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

module.exports.artirstsDelete = function(req, res) {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    const deleteWithCallback = callbackify(function(songId, artistId) {
        const artists = process.env.COLLECTION_ARTISTS;
        const field_id = process.env.FIELD_ID;
        return Song.findOneAndUpdate({field_id : songId}, {$pull : {artists : {field_id : artistId}}}).exec();
    });
    deleteWithCallback(songId, artistId, function(err, song) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
            return;
        } else if (!song) {
            res.status(parseInt(process.env.HTTP_RESPONSE_NOT_FOUND)).json({ message : process.env.SONG_ID_NOT_FOUND_MESSAGE});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({result : process.env.HTTP_RESULT});
        }
    });

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

const addArtist = function(req, res, song) {
    const artist = {
        name : req.body.name,
        age : req.body.age
    };
    song.artists.push(artist);
    const saveWithCallback = callbackify(function(artist) {
        return song.save();
    });
    saveWithCallback(song, function(err, response) {
        if (err) {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(err);
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
        }
    });
}

