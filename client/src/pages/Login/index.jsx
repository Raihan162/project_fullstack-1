import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLogin } from './actions';
import { Toaster } from 'react-hot-toast';
import encryptPayload from '@utils/encryptHelper';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({});

  const onChangeHandler = (value, type) => {
    setLogin({ ...login, [type]: value })
  };


  const onSubmit = () => {
    const loginUser = {
      email: encryptPayload(login?.email),
      password: encryptPayload(login?.password)
    }
    dispatch(doLogin(loginUser, () => {
      navigate('/dashboard');
    }))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <FormattedMessage id='login' />
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={<FormattedMessage id='register_email' />}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => onChangeHandler(e.target.value, 'email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={<FormattedMessage id='register_password' />}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onChangeHandler(e.target.value, 'password')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmit}
              >
                <FormattedMessage id='login' />
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    <FormattedMessage id='login_dont_have_account' />
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box >
        </Grid >
      </Grid >
      <Toaster />
    </ThemeProvider >
  );
};
