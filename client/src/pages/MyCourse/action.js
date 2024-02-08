import { GET_COURSE, SET_COURSE } from "./constant";

export const getCourse = () => ({
    type: GET_COURSE
});

export const setCourse = (data) => ({
    type: SET_COURSE,
    data
})