export const FETCHING_ROOMS = 'FETCHING_ROOMS';
export const ROOMS_FETCHED = 'ROOMS_FETCHED';
export const FETCH_ROOMS_ERROR = 'FETCH_ROOMS_ERROR';

export const get_rooms = (socket) => {
    return dispatch => {
        dispatch({type: FETCHING_ROOMS});
        return fetch("http://localhost:4000/getRoomStats")
            .then(handleErrors)
            .then(res => res.json())
            .then(res => dispatch({
                type: ROOMS_FETCHED,
                payload: res
            }))
            .catch(err => dispatch({
                type: FETCH_ROOMS_ERROR,
                payload: err
            }));
    };
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};


export const subscribe_events = (socket) => {
    return dispatch => {
        socket.on('rooms-available', (res) => {
            dispatch({
                type: ROOMS_FETCHED,
                payload: res
            });
        });
    }
};
