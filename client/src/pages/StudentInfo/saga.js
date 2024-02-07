import { GET_DATA_STUDENT } from "./constants";
import { getDetailUser } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setData } from "./actions";

function* getUserDetail() {
    try {
        const response = yield call(getDetailUser);
        // console.log(response, '<<<< SAGA')
        yield put(setData(response.response))
    } catch (error) {
        console.log(error)
    }
};

export default function* detailUserSaga() {
    yield takeLatest(GET_DATA_STUDENT, getUserDetail)
}