import MainLayout from '@layouts/MainLayout';
import SecondLayout from '@layouts/SecondLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import NotFound from '@pages/NotFound';
import StudentInfo from '@pages/StudentInfo';
import MyCourse from '@pages/MyCourse';
import Registration from '@pages/Registration';
import MyStudent from '@pages/MyStudent';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/info',
    name: 'Stundent Info',
    protected: true,
    component: StudentInfo,
    layout: SecondLayout,
  },
  {
    path: '/my-course',
    name: 'My Course',
    protected: true,
    component: MyCourse,
    layout: SecondLayout,
  },
  {
    path: '/my-student',
    name: 'My Course',
    protected: true,
    component: MyStudent,
    layout: SecondLayout,
  },
  {
    path: '/registration',
    name: 'Registration',
    protected: true,
    component: Registration,
    layout: SecondLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
