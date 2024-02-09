import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'user/register-student',
  login: 'user/login-student',
  getMajor: 'major/list-major',
  detailUser: 'user/detail-user',
  courseUser: 'course/course-by-id',
  otherCourse: 'course/other-course',
  addCourseUser: 'registration/add'
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const register = (data) => callAPI(urls.register, 'POST', {}, {}, data);

export const login = (formData) => callAPI(urls.login, 'POST', {}, {}, formData);

export const getDetailUser = () => {
  return callAPI(urls.detailUser, 'GET')
};

export const courseUser = () => callAPI(urls.courseUser, 'GET');

export const otherCourse = () => callAPI(urls.otherCourse, 'GET');

export const getMajorAPI = () => callAPI(urls.getMajor, 'GET');

export const addRegistration = (data) => callAPI(urls.addCourseUser, 'POST', {}, {}, data)