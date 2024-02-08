import { Grid, TextField, Button } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login({ setIsAuthenticated, isAuthenticate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticate) {
      navigate('/dashboard');
    }
  });

  const hanldeEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      if (resp.status === 200) {
        console.log(resp)
        const { token, refreshToken } = resp.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);

        setTimeout(() => {
          console.log('isAuthenticate', isAuthenticate)
        }, 10000);
        return navigate('/dashboard');
      }
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