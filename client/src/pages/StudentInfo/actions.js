import { GET_DATA_STUDENT, SET_DATA_STUDENT } from "./constants";

export const getData = () => ({
    type: GET_DATA_STUDENT
})

export const setData = (data) => ({
    type: SET_DATA_STUDENT,
    data
})