import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { useState } from 'react';
import Dashboard from './Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Signup isAuthenticate={isAuthenticated} />
    },
    {
      path: '/login',
      element: <Login setIsAuthenticated={setIsAuthenticated} isAuthenticate={isAuthenticated} />
    },
    {
      path: '/dashboard',
      element: <Dashboard isAuthenticated={isAuthenticated} />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
