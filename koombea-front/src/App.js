import React, { useState } from 'react'
import './App.css';
import { SignIn } from './components/Login';
import { SignUp } from './components/SingUp';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [user, setUser] = useState(null);

  if (user){
    return <div>Logeado</div>
    
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Item><SignUp/></Item>
      </Grid>
      <Grid item xs={6}>
        <Item><SignIn setUser={setUser}/></Item>
      </Grid>
    </Grid>
   
  )
}

export default App;
