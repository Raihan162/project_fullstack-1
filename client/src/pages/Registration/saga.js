import { takeLatest, call, put } from "redux-saga/effects";
import { ADD_COURSE, DELETE_COURSE, GET_OTHER_COURSE } from "./constants";
import { addRegistration, deleteCourseOnRegistration, otherCourse } from "@domain/api";
import { setOtherCourse } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* getOtherCourseSaga() {
    try {
        const response = yield call(otherCourse);
        yield put(setOtherCourse(response?.response))
    } catch (error) {
        console.log(error)
    }
};

function* doAddCourseSaga({ data, cb }) {
    yield put(setLoading(true));
    try {
        // console.log(data, '<<<<DATA')
        yield call(addRegistration, data);
        cb();
    } catch (error) {
        yield put(showPopup('Error', error.message))
    }
    yield put(setLoading(false))
}

function* deleteMyCourseSaga({ id, cb }) {
    yield put(setLoading(true));
    try {
        yield put(deleteCourseOnRegistration, id);
        cb();
    } catch (error) {
        yield put(showPopup('Error', error.message))
    }
    yield put(setLoading(false))
}

export default function* registrationSaga() {
    yield takeLatest(GET_OTHER_COURSE, getOtherCourseSaga);
    yield takeLatest(ADD_COURSE, doAddCourseSaga);
    yield takeLatest(DELETE_COURSE, deleteMyCourseSaga)
};