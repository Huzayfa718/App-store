import { createBrowserRouter } from 'react-router-dom';
import Root from '../Components/Root/Root';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';
import MyInfo from '../Components/MyInfo/MyInfo';
import Apps from '../Components/Apps/Apps';
import Appdetails from '../Components/Appdetails/Appdetails';

async function appsLoader() {
  const response = await fetch('/data.json');
  return response.json();
}



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/',
            element: <Apps />,
            loader: appsLoader,
        }
        ,
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile',
        element: <PrivateRoute><MyInfo></MyInfo></PrivateRoute>,
      },
          {
        path: "/apps/:id",
        element:<PrivateRoute> <Appdetails/> </PrivateRoute> ,
        loader: appsLoader,

      }
    ],
    errorElement: (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <h1 className="text-6xl font-extrabold mb-4">404</h1>
    <p className="text-2xl font-semibold mb-2">Page Not Found</p>
    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
    <a
      href="/"
      className="btn btn-neutral"
    >
      Go Back Home
    </a>
  </div>
),

  },
]);

export default router;
