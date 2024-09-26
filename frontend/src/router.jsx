import { createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

export const router = createBrowserRouter([
  {
    path: "/",  
    element: <Login />, 
  },
  {
    path: "/register",  
    element: <Register />,
  },
  {
    path: "/profile",  
    element: <Profile />,
  },
]);

export default router;
