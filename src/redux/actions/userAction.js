import {
    SET_USER,
    SET_ERRORS,
    LOADING_UI,
    LOADING_USER,
    CLEAR_ERRORS,
    SET_UNAUTHENTICATED,
} from "../types";
import axios from "axios";
import { baseUrl } from "../../api/index";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`${baseUrl}/login`, userData)
        .then((res) => {
            console.log("loginUser success", res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            console.log("loginUser error", err.response.data);
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(`${baseUrl}/signup`, newUserData)
        .then((res) => {
            console.log("signupUser success", res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            console.log("signupUser error", err.response.data);
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FirebaseToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get(`${baseUrl}/user`)
        .then((res) => {
            console.log("getUserData success", res.data);
            dispatch({ type: SET_USER, payload: res.data });
        })
        .catch((err) => console.log("getUserData error", err));
};

export const uploadImage = (formData) => (dispatch)=>{
    dispatch({type: LOADING_USER})
    axios.post(`${baseUrl}/user/image`, formData)
        .then((res) => {
            console.log("uploadImage success", res.data);
            dispatch(getUserData())
        })
        .catch((err) => console.log("uploadImage error", err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post(`${baseUrl}/user/`, userDetails)
    .then((res) => {
        console.log("editUserDetails response", res.data);
        dispatch(getUserData())
    })
    .catch((err) => console.log("editUserDetails error", err))
}

const setAuthorizationHeader = (token) => {
    const FirebaseToken = `Bearer ${token}`;
    localStorage.setItem("FirebaseToken", FirebaseToken);
    axios.defaults.headers.common["Authorization"] = FirebaseToken;
};
