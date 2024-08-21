import {createBrowserRouter, Navigate} from 'react-router-dom';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/NotFound';
import DefaultLayout from './component/DefaultLayout';
import GuessLayout from './component/GuessLayout';
import UserForm from './pages/UserForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to='/users'/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '/',
        element: <GuessLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path:'*',
        element:<Notfound/>
    }
])

export default router;