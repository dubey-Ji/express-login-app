import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useOutletContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  })

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