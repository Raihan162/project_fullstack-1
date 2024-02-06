import { GET_MAJOR, SET_MAJOR, SET_STEP, SET_USER } from "./constants";

export const setStep = (step) => ({
    type: SET_STEP,
    step
})

export const setUser = (user, cb) => ({
    type: SET_USER,
    user,
    cb
})

export const getMajor = () => ({
    type: GET_MAJOR
})

export const setMajor = (data) => ({
    type: SET_MAJOR,
    data
})