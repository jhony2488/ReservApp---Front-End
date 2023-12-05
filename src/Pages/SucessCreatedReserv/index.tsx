import React from 'react';
import { useStyles } from './style';
import { Button } from '@material-ui/core';


export default function SucessCreatedReserv() {
    const { container, wrapper, contentTitle } = useStyles();
    return (
        <div className={container}>
            <div className={wrapper}>
                <h1 className={contentTitle}>Sua reserva foi registrada com sucesso !!!</h1>
                <Button variant='contained' color='primary' onClick={() => (window.location.href = '/')}>
                    Fazer mais reservas
                </Button>
            </div>
        </div>
    );
};
