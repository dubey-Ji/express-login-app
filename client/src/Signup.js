import { Grid, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import authService from './Authservice';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const hanldePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.signup(name, email, password);
      if (response.status === 201) {
        return navigate('/login');
      }
      console.log('Something went wrong');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container display='flex'>
      <Grid xl={6} height='100vh'>
        <img src='./Login.jpeg' alt='Loginimage' />
      </Grid>
      <Grid xl={6} display='flex' justifyContent='center' alignItems='center'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <TextField
            required
            id="name"
            label="Name"
            placeholder='name'
            onChange={handleNameChange}
            style={{ margin: '1em 0 0.5em 0', width: '50%' }}
          />
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            placeholder='email@email.com'
            onChange={handleEmailChange}
            style={{ margin: '0.5em 0 0.5em 0', width: '50%' }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={hanldePasswordChange}
            style={{ margin: '0.5em 0 0.5em 0', width: '50%' }}
          />
          <Button variant="contained" color="success" style={{ width: '50%' }} type='submit'>
            Sign Up
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Signup;