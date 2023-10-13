import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from "react-hook-form";
import { signup } from '../../api/account'

export function SignUp() {
  const { control, handleSubmit, setError, watch } = useForm();

  const [errorMessages, setErrorMessages] = useState([]);
  const [successSignUp, setSuccessSignUp] = useState(false);

  const setFormError = (field, message) => {
    setError(field, {
      type: "backend",
      message: message,
    });
  }

  const onSubmit = (data) => {
    setErrorMessages([])
    setSuccessSignUp(false)
    signup(data).then(({ data }) => {
      setSuccessSignUp(true)
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data)
        if (error.response.data.email)
          setFormError("email", error.response.data.email[0])
        if (error.response.data.password)
          setFormError("password", error.response.data.password[0])
        if (error.response.data.non_field_errors)
          setErrorMessages(error.response.data.non_field_errors)
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessages(["No response..."])
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessages(["Internal server error"])
        console.error('Error', error.message);
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
          Sign up
        </Typography>
        {
          (errorMessages.length > 0) &&
          errorMessages.map((error) => (
            <Typography component="span" key={error}>
              {error}
            </Typography>
          ))
        }
        {
          successSignUp &&
          <Typography component="span">
            Usuario creado exitosamente
          </Typography>
        }

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Email address required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    autoFocus
                    label="Email Address"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    autoComplete="email"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Password required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    autoFocus
                    label="Password"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    type="password"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password_confirmation"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Password confirmation required",
                  validate: (value) => value === watch('password') || "Passwords don't match."
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    autoFocus
                    label="Password confirmation"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    type="password"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}