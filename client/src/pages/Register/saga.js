import { getMajorAPI, register } from "@domain/api";
import { GET_MAJOR, SET_USER } from "./constants";
import { put, takeLatest, call } from 'redux-saga/effects';
import { setLoading } from "@containers/App/actions";

function* registerStudent({ user, cb }) {
    try {
        yield call(register, user);
        cb();
    } catch (error) {
        // console.log(error)
    }
}

export default function* registerStudentSaga() {
    yield takeLatest(SET_USER, registerStudent)
}