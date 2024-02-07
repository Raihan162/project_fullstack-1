import { login } from "@domain/api";
import { DO_LOGIN } from "./constants";
import { setLoading } from "@containers/App/actions";
import { put, takeLatest, call } from "redux-saga/effects";
import toast from "react-hot-toast";
import { setLogin, setToken } from "@containers/Client/actions";

function* doLoginSaga({ formData, cb }) {
    yield put(setLoading(true))
    try {
        const response = yield call(login, formData);
        toast.success('Login success')
        yield put(setLogin(true));
        yield put(setToken(response?.response?.token))
        cb();
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
}

export default function* loginSaga() {
    yield takeLatest(DO_LOGIN, doLoginSaga)
}