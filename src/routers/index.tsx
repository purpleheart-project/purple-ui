import MainBox from '../layouts/MainBox';
import Admin from '../pages/admin';
import Login from '../pages/Login';

export default [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/user',
        element: <Admin />,
      },
    ],
  },
];
