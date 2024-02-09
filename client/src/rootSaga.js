import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerStudentSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import detailUserSaga from '@pages/StudentInfo/saga';
import MyCourseSaga from '@pages/MyCourse/saga';
import registrationSaga from '@pages/Registration/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerStudentSaga(),
    loginSaga(),
    detailUserSaga(),
    MyCourseSaga(),
    registrationSaga()
  ]);
}
