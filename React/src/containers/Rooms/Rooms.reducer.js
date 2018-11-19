import {
    FETCHING_ROOMS,
    ROOMS_FETCHED,
    FETCH_ROOMS_ERROR
} from './Rooms.actions';

const initial_state = {
    emptyRooms: []
}

export default (state = initial_state, action) => {

    switch (action.type) {

        case FETCHING_ROOMS:
            return {
                ...state,
                fetching: true
            };
        case ROOMS_FETCHED:
            return {
                ...state,
                totalRooms: action.payload.totalRoomCount,
                emptyRooms: action.payload.emptyRooms,
                fetching: false
            };
        case FETCH_ROOMS_ERROR:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state
    }
}