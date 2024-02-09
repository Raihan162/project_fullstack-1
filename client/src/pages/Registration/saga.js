import { takeLatest, call, put } from "redux-saga/effects";
import { GET_OTHER_COURSE } from "./constants";
import { otherCourse } from "@domain/api";
import { setOtherCourse } from "./actions";

function* getOtherCourseSaga() {
    try {
        const response = yield call(otherCourse);
        yield put(setOtherCourse(response?.response))
    } catch (error) {
        console.log(error)
    }
}

export default function* registrationSaga() {
    yield takeLatest(GET_OTHER_COURSE, getOtherCourseSaga)
}