/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { Typography, Container, Box, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../../schemasValidations/login';
import { PropsUserLogin } from '../../interfaces/users';
import { loginUser } from '../../services/users';
import { Input } from '../../Components';
import { useStyles } from './style';

export default function Login() {
    const classes = useStyles();

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schemaLogin),
    });

    const handleSubmitLogin = async ({ email, password }: PropsUserLogin) => {
        loginUser({ email, password }).then((response) => {
            localStorage.setItem('token-login', JSON.stringify(response.data));
            window.location.href = '/admin/reservas';
        }).catch((err) => {

                alert('Email ou senha incorretos');

        });
    };

    useEffect(() => {
        const token: string = localStorage.getItem('token-login') || '';

        if (token !== '') {
            window.location.href = '/admin/reservas';
        }
    }, []);

    return (
        <>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Login
                </Typography>
                <Box className={classes.box}>
                    <form onSubmit={handleSubmit(handleSubmitLogin)}>
                        <Box className={classes.boxWrapper}>
                            <label htmlFor="input-email">
                                Email
                            </label>
                            <Input id="input-email" control={control} nameInput={'email'} placeholder="jhonata@email.com" />
                            <p className={classes.errorMessage}>{errors.email?.message}</p>
                            <label htmlFor="input-password">
                                Password
                            </label>
                            <Input id="input-password" placeholder="***********" type="password" hintText="Password" control={control} nameInput={'password'} />
                            <p className={classes.errorMessage}>{errors.password?.message}</p>
                            <div className={classes.containerButtons}>
                                <Button variant='contained' color='primary' type='submit'>
                                    Fazer Login
                                </Button>
                            </div>
                        </Box>
                    </form>

                </Box>
            </Container>
        </>
    );
}
