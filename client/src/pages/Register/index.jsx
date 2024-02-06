import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import encryptPayload from '@utils/encryptHelper';
import FirstForm from './components/FirstForm';
import SecondForm from './components/SecondForm';

import { setStep, setUser } from './actions';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const secretKey = 'super_strong_key';

    const currentStep = useSelector((state) => state.register.step);
    const userState = useSelector((state) => state.register.user);

    const [userStudent, setUserStudent] = React.useState({});

    const onChangeHandler = (value, type) => {
        setUserStudent({
            ...userStudent,
            [type]: value
        })
    }

    const renderedComponent = () => {
        switch (currentStep) {
            case 1:
                return <FirstForm
                    valueName={userStudent?.name}
                    valueEmail={userStudent?.email}
                    valueContact={userStudent?.contact}
                    valuePassword={userStudent?.password}
                    onChangeName={(e) => onChangeHandler(e.target.value, 'name')}
                    onChangeContact={(e) => onChangeHandler(e.target.value, 'contact')}
                    onChangeEmail={(e) => onChangeHandler(e.target.value, 'email')}
                    onChangePassword={(e) => onChangeHandler(e.target.value, 'password')}
                />
            case 2:
                return <SecondForm onChangeMajor={(e) => onChangeHandler(e.target.value, 'major_id')} />
            default:
                break;
        }
    }

    const handlerStep = (operator) => {
        if (operator === '+') {
            dispatch(setStep(currentStep + 1))
        } else if (operator === '-') {
            dispatch(setStep(currentStep - 1))
        }
    }

    const onSubmit = () => {
        try {
            let user = {
                name: userStudent.name,
                email: encryptPayload(userStudent.email),
                contact: encryptPayload(userStudent.contact),
                password: encryptPayload(userStudent.password),
                major_id: encryptPayload(String(userStudent.major_id))
            }
            dispatch(setUser(user, () => {
                // setUserStudent({
                //     name: '',
                //     email: '',
                //     contact: '',
                //     password: '',
                //     major_id: 1
                // });
                // dispatch(setUser(userStudent))
                dispatch(setStep(1));
                navigate('/login');
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        <FormattedMessage id='register' />
                    </Typography>
                    {
                        renderedComponent()
                    }
                    <Box sx={{
                        mt: 3,
                        display: 'flex',
                        width: '100%',
                        gap: '10px'
                    }}>
                        {
                            currentStep === 2 ?
                                <>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => handlerStep('-')}
                                    >
                                        <FormattedMessage id='back' />
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={onSubmit}
                                    >
                                        <FormattedMessage id='submit' />
                                    </Button>
                                </>
                                :
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handlerStep('+')}
                                >
                                    <FormattedMessage id='next' />
                                </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};