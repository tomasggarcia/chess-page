import Board from '../components/chess/Board';
import IRoute from '../interfaces/routes';


const routes: IRoute[] = [
    {
        path: '/',
        name: 'Board',
        component: Board,
        exact: true,
    },
]

export default routes;
