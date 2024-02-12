import { Grid, TextField, Button } from '@mui/material'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from './Authservice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);

  const hanldeEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await authService.login(email, password);
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('refresh-token', resp.data.refreshToken);
        setIsAuthenticated(true)
        return navigate('/dashboard');
      }
      console.log('something went wrong');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container display='flex'>
      <Grid xl={6} height='100vh'>
        <img src='./Login.jpeg' alt='Loginimage' />
      </Grid>
      <Grid xl={6} display='flex' direction='column' justifyContent='center' alignItems='center'>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            placeholder='email@email.com'
            style={{ margin: '0.5em 0 0.5em 0', minWidth: '50%' }}
            onChange={hanldeEmailChange}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={{ margin: '0.5em 0 0.5em 0', minWidth: '50%' }}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" color="success" style={{ minWidth: '50%' }} type='submit'>
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Login;