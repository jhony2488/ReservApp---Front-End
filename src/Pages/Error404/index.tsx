import React from 'react';
import { useStyles } from './style';
import { Button } from '@material-ui/core';


export default function PageError404() {
    const { container, wrapper, contentTitle } = useStyles();
    return (
        <div className={container}>
            <div className={wrapper}>
                <h1 className={contentTitle}>Não encontramos a página que você pesquisou, mas você pode voltar ao início</h1>
                <Button variant='contained' color='primary' onClick={() => (window.location.href = '/')}>
                    Voltar para o início
                </Button>
            </div>
        </div>
    );
};
