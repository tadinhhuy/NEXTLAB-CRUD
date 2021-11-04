import { lazy } from 'react';
import { PUBLIC_ROUTES } from '../constants/routes';

const PostsPage = lazy(() => import('../pages/Posts'));


const publicRoutes = [
  {
    component: PostsPage,
    path: PUBLIC_ROUTES.HOME,
    exact: true,
  },
];

export default publicRoutes;
