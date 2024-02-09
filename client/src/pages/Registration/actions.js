import { GET_OTHER_COURSE, SET_OTHER_COURSE } from "./constants";

export const getOtherCourse = () => ({
    type: GET_OTHER_COURSE
});

export const setOtherCourse = (data) => ({
    type: SET_OTHER_COURSE,
    data
})