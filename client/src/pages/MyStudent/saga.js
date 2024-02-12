import { deleteCourseOnRegistration, getMyStudent } from "@domain/api";
import { put, takeLatest, call } from "redux-saga/effects";
import { DELETE_MY_STUDENT, GET_MY_STUDENT } from "./constant";
import { setLoading } from "@containers/App/actions";
import { setMyStudent } from "./action";

function* getMyStudentSaga() {
    yield put(setLoading(true))
    try {
        const response = yield call(getMyStudent);
        yield put(setMyStudent(response?.response))
    } catch (error) {
        console.log(error)
    }
    yield put(setLoading(false))
}

function* deleteMyStudentSaga({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(deleteCourseOnRegistration, data);
        cb();
    } catch (error) {
        console.log(error)
    }
    yield put(setLoading(false))
}

export default function* MyStudentSaga() {
    yield takeLatest(GET_MY_STUDENT, getMyStudentSaga)
    yield takeLatest(DELETE_MY_STUDENT, deleteMyStudentSaga)
}