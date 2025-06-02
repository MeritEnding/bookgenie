import {createBrowserRouter} from 'react-router-dom';
import Home from './Home';
import Update from './Update';
import Detail from './Detail';
import Register from './Register';

const router = createBrowserRouter([
    {
        id:0,
        path: '/',
        element: <Home />,
    },
    {
        id: 1,
        path: '/detail/:id',
        element: <Detail />
    },
    {
        id: 2,
        path: '/update/:id',
        element: <Update/>
    },
    {
        id: 3,
        path: '/register',
        element: <Register/>
    },
]);

export default router;