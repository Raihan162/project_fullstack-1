import { DELETE_MY_STUDENT, GET_MY_STUDENT, SET_MY_STUDENT } from "./constant";

export const getStudent = () => ({
    type: GET_MY_STUDENT
})

export const setMyStudent = (data) => ({
    type: SET_MY_STUDENT,
    data
})

export const deleteMyStudent = (data, cb) => ({
    type: DELETE_MY_STUDENT,
    data,
    cb
})