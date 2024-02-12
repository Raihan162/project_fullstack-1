import { ADD_COURSE, DELETE_COURSE, GET_OTHER_COURSE, SET_OTHER_COURSE } from "./constants";

export const getOtherCourse = () => ({
    type: GET_OTHER_COURSE
});

export const setOtherCourse = (data) => ({
    type: SET_OTHER_COURSE,
    data
})

export const addToMyCourse = (data, cb) => ({
    type: ADD_COURSE,
    data,
    cb
});

export const deleteMyCourse = (id, cb) => ({
    type: DELETE_COURSE,
    id,
    cb
})