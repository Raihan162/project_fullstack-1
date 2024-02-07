import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import NotFound from '@pages/NotFound';
import Dashboard from '@pages/Dashboard';
import StudentInfo from '@pages/StudentInfo';
import SecondLayout from '@layouts/SecondLayout';

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
    path: '/dashboard',
    name: 'Dashboard',
    protected: false,
    component: Dashboard,
    layout: SecondLayout,
  },
  {
    path: '/student-info',
    name: 'Stundent Info',
    protected: false,
    component: StudentInfo,
    layout: SecondLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
