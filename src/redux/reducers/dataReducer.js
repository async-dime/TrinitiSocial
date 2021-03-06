import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM
} from "../types";

const initialState = {
    screams: [],
    scream: {},
    loading: false,
};

export default function dataReducer(state = initialState, actions) {
    switch (actions.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: actions.payload,
                loading: false,
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(
                (scream) => scream.screamId === actions.payload.screamId
            );
            state.screams[index] = actions.payload;
            return {
                ...state,
            };
        case DELETE_SCREAM:
            // index = state.scream.findIndex(
            //     (scream) => scream.screamId === actions.payload
            // )
            // state.screams.splice(index, 1)
            // return {
            //     ...state
            // }
            return {
                ...state,
                screams: state.screams.filter(
                    (scream) => scream.screamId !== actions.payload
                ),
            };
        case POST_SCREAM: 
            return {
                ...state,
                screams: [
                    actions.payload,
                    ...state.screams
                ]
            }
        default:
            return state;
    }
}
