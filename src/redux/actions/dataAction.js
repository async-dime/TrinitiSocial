import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
} from "../types";
import axios from "axios";
import { baseUrl } from "../../api/index";

//get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`${baseUrl}/screams`)
        .then((res) => {
            console.log("getScreams success", res.data);
            dispatch({
                type: SET_SCREAMS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_SCREAMS,
                payload: [],
            });
            console.log("getScreams error", err);
        });
};

//post scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`${baseUrl}/scream/`, newScream)
        .then((res) => {
            console.log("postScream success", res.data);
            dispatch({
                type: POST_SCREAM,
                payload: res.data,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
            console.log("postScream error", err.response.data);
        });
};

//like a screams
export const likeScream = (screamId) => (dispatch) => {
    axios
        .get(`${baseUrl}/scream/${screamId}/like`)
        .then((res) => {
            console.log("likeScream success", res.data);
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log("likeScream error", err.response.data));
};

//unlike a screams
export const unlikeScream = (screamId) => (dispatch) => {
    axios
        .get(`${baseUrl}/scream/${screamId}/unlike`)
        .then((res) => {
            console.log("unlikeScream success", res.data);
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log("unlikeScream error", err));
};

//delete scream
export const deleteScream = (screamId) => (dispatch) => {
    axios
        .delete(`${baseUrl}/scream/${screamId}`)
        .then((res) => {
            console.log("deleteScream success", res.data);
            dispatch({ type: DELETE_SCREAM, payload: screamId });
        })
        .catch((err) => console.log("deleteScream error", err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
