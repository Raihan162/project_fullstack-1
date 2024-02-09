import { takeLatest, call, put } from "redux-saga/effects";
import { ADD_COURSE, GET_OTHER_COURSE } from "./constants";
import { addRegistration, otherCourse } from "@domain/api";
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

function* doAddCourseSaga({ data }) {
    yield put(setLoading(true));
    try {
        // console.log(data, '<<<<DATA')
        yield call(addRegistration, data);
    } catch (error) {
        yield put(showPopup('Error', error.message))
    }
    yield put(setLoading(false))
}

export default function* registrationSaga() {
    yield takeLatest(GET_OTHER_COURSE, getOtherCourseSaga)
    yield takeLatest(ADD_COURSE, doAddCourseSaga)
};