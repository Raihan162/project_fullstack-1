import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerStudentSaga from '@pages/Register/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerStudentSaga()
  ]);
}
