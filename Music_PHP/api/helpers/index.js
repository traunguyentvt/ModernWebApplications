
const helpers = {
    createRespone: function(status= 200, message= "") {
        return {status:status, message:{message:message}};
    },
    
    setStatusResponse: function(response, status) {
        response.status= status;
    },
    
    setErrorMessage: function(response, error) {
        response.message= error;
    },
    
    sendResponse: function(res, response) {
        res.status(response.status).json(response.message);
    },
    
    setMessageToCreatedSuccess: function(response, data) {
        response.status= parseInt(process.env.HTTP_RESPONSE_CREATED, 10);
        response.message= data;
    },
    
    setMessageToInternalError: function(response, error) {
        response.status= parseInt(process.env.HTTP_RESPONSE_ERROR, 10);
        response.message= error;
    },
    
    setMessageToBadRequest: function(response, message) {
        response.status= parseInt(process.env.HTTP_RESPONSE_BAD_REQUEST, 10);
        response.message= {message:message};
    },
    
    setMessageToNotFound: function(response, message="") {
        response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
        response.message= {message:message};
    },
    
    setMessageToRequestSuccess: function(response, data) {
        response.status= parseInt(process.env.HTTP_RESPONSE_OK, 10);
        response.message= data;
    },

    checkSongExists: function(response, song) {
        console.log(song);
        return new Promise((resolve, reject) => {
            if (!song) {
                response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
                reject({message:process.env.SONG_ID_NOT_FOUND_MESSAGE});
            } else {
                resolve(song);
            }
        });
    },

    checkArtistExists: function(response, song, artistId) {
        const artist= song.artists.id(artistId);
        return new Promise((resolve, reject) => {
            if (!artist) {
                response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
                reject({message:process.env.ARTIST_ID_NOT_FOUND_MESSAGE});
            } else {
                resolve(artist);
            }
        });
    }
};

module.exports = helpers;