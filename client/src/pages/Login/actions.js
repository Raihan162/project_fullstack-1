import { DO_LOGIN, SET_LOGIN } from "./constants";

export const doLogin = (formData, cb) => ({
    type: DO_LOGIN,
    formData,
    cb
});

export const setLogin = (login) => ({
    type: SET_LOGIN,
    login
})