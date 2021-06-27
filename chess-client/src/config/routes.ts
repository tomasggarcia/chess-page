import IRoute from '../interfaces/routes';
import Board from '../components/chess/Board';
import Login from '../components/login/Login';


const routes: IRoute[] = [
    {
        path: '/home',
        name: 'Board',
        component: Board,
        exact: true,
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
        exact: true,
    },
]

export default routes;
