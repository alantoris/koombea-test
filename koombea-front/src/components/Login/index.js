import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from "react-hook-form";
import { redirect } from "react-router-dom";
import { login } from '../../api/account'
import { setAuthToken } from '../../api/api'


export function SignIn({ setUser }) {
  const { control, handleSubmit, setError } = useForm();
  const [errorMessages, setErrorMessages] = useState([]);


  const setFormError = (field, message) => {
    setError(field, {
      type: "backend",
      message: message,
    });
  }

  const onSubmit = (data) => {
    setErrorMessages([])
    login(data.email, data.password).then(({ data }) => {
      setAuthToken(data.access_token)
      setUser(data.user)
      redirect("/");
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data)
        if (error.response.data.email)
          setFormError("email", error.response.data.email[0])
        if (error.response.data.password)
          setFormError("password", error.response.data.password[0])
        if (error.response.data.non_field_errors)
          setErrorMessages(error.response.data.non_field_errors)
      } else if (error.request) {
        setErrorMessages(["No response"])
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessages(["Internal server error"])
        console.log('Error', error.message);
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {
          (errorMessages.length > 0) &&
          errorMessages.map((error) => (
            <Typography component="span" key={error}>
              {error}
            </Typography>
          ))
        }
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{ required: "Email required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                autoFocus
                label="Email Address"
                variant="outlined"
                value={value}
                onChange={onChange}
                margin="normal"
                fullWidth
                autoComplete="email"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password"
                variant="outlined"
                value={value}
                onChange={onChange}
                margin="normal"
                fullWidth
                error={!!error}
                type="password"
                autoComplete="current-password"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
}