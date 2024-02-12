import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import AuthService from './Authservice';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useOutletContext();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token) {
      setIsAuthenticated(false);
      navigate('/login');
    }

    async function fetchProtectedPath() {
      const resp = await AuthService.dashboard();
      if (resp.status === 400) {
        setIsAuthenticated(false);
        return 'login';
      } else if (resp.status === 401) {
        return 'signup';
      } else {
        return resp;
      }
    }
    fetchProtectedPath()
      .then(resp => {
        return Promise.resolve();
      })
      .catch(err => {
        // console.log('err', err.status);
        setIsAuthenticated(false)
        return navigate('/login');
        // return Promise.resolve();
      })
  }, [])

  const handleOnClick = () => {
    return navigate('/login');
  }

  const handleSignup = () => {
    return navigate('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    setIsAuthenticated(false);
    return navigate('/login');
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleOnClick}>
        Login Page
      </button>
      <button onClick={handleSignup}>
        Signup
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default Dashboard;