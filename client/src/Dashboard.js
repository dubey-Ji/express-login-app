import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard({ isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
  });

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard;