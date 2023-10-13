import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import Grid from '@mui/material/Grid';
import { scrape_page } from '../../api/pages'


export function Page() {
  const { control, handleSubmit, setError } = useForm();
  const [errorMessages, setErrorMessages] = useState([]);


  const setFormError = (field, message) => {
    setError(field, {
      type: "backend",
      message: message,
    });
  }

  const onSubmit = (data) => {
    scrape_page(data).then(({ data }) => {
        console.log(data)
        //TODO: Reload table
    }).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.error(error.response.data)
          if (error.response.data.page)
            setFormError("page", error.response.data.page[0])
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
      {
          (errorMessages.length > 0) &&
          errorMessages.map((error) => (
            <Typography component="span" key={error}>
              {error}
            </Typography>
          ))
        }
      <Paper>
        <form  onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Controller
                        name="page"
                        control={control}
                        defaultValue={""}
                        rules={{ required: "Web page link" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            autoFocus
                            label="Web page link"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            margin="normal"
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Scrape
                    </Button>
                </Grid>
            </Grid>
                
            
        </form>
      </Paper>
    </Container>
  );
}