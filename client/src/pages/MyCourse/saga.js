import { put, takeLatest, call } from "redux-saga/effects";
import { GET_COURSE } from "./constant";
import { courseUser } from "@domain/api";
import { setCourse } from "./action";

function* getCourseUser() {
    try {
        const response = yield call(courseUser)
        yield put(setCourse(response.response))
    } catch (error) {
        console.log(error)
    }
}

export default function* MyCourseSaga() {
    yield takeLatest(GET_COURSE, getCourseUser)
}