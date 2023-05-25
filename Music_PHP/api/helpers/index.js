
const helpers = {
    createRespone: function(status= parseInt(process.env.HTTP_RESPONSE_OK, 10), message= process.env.EMPTY_STRING) {
        return {[process.env.VARIABLE_STATUS]: status, data: {[process.env.VARIABLE_MESSAGE]:message}};
    },

    sendResponse: function(res, response) {
        res.status(response.status).json(response.data);
    },
    
    setStatusResponse: function(response, status) {
        response.status= status;
    },
    
    setDataResponse: function(response, data) {
        response.data= data;
    },
    
    setDataToCreatedSuccess: function(response, data) {
        response.status= parseInt(process.env.HTTP_RESPONSE_CREATED, 10);
        response.data= data;
    },
    
    setDataToInternalError: function(response, error) {
        response.status= parseInt(process.env.HTTP_RESPONSE_ERROR, 10);
        response.data= error;
    },
    
    setMessageToBadRequest: function(response, message) {
        response.status= parseInt(process.env.HTTP_RESPONSE_BAD_REQUEST, 10);
        response.data= {[process.env.VARIABLE_MESSAGE]: message};
    },
    
    setMessageToNotFound: function(response, message=process.env.EMPTY_STRING) {
        response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
        response.data= {[process.env.VARIABLE_MESSAGE]: message};
    },

    setDataToForbiddenRequest: function(response, error) {
        response.status= parseInt(process.env.HTTP_RESPONSE_FORBIDDEN, 10);
        response.data= error;
    },
    
    setDataToRequestSuccess: function(response, data) {
        response.status= parseInt(process.env.HTTP_RESPONSE_OK, 10);
        response.data= data;
    },

    setMessageToUnauthorizedRequest: function(response, message=process.env.EMPTY_STRING) {
        response.status= parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZED, 10);
        response.data= {[process.env.VARIABLE_MESSAGE]: message};
    },

    checkSongExists: function(response, song) {
        return new Promise((resolve, reject) => {
            if (!song) {
                response.status= parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10);
                reject({[process.env.VARIABLE_MESSAGE]: process.env.SONG_ID_NOT_FOUND_MESSAGE});
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
                reject({[process.env.VARIABLE_MESSAGE]: process.env.ARTIST_ID_NOT_FOUND_MESSAGE});
            } else {
                resolve(artist);
            }
        });
    }
};

module.exports= helpers;