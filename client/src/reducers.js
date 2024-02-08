import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import loginReducer, { storedKey as storedLoginState } from '@pages/Login/reducer';
import detailUserReducer, { storedKey as storedDetailUserState } from '@pages/StudentInfo/reducer';
import MyCourseReducer,{storedKey as storedCourseUserState} from '@pages/MyCourse/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
  login: { reducer: loginReducer, whitelist: storedLoginState },
  detailUser: { reducer: detailUserReducer, whitelist: storedDetailUserState },
  courseUser: { reducer: MyCourseReducer, whitelist: storedCourseUserState }
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
