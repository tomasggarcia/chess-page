import IRoute from '../interfaces/routes';
import Board from '../components/chess/Board';
import Login from '../components/login/Login';
import NavBar from '../components/NavBar/NavBar';


const routes: IRoute[] = [
    {
        path: '/',
        name: 'NavBar',
        component: NavBar,
        exact: false,
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
        exact: true,
    },
    {
        path: '/home',
        name: 'Board',
        component: Board,
        exact: true,
    },

]

export default routes;
