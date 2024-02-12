import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AppLayout from './AppLayout';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
