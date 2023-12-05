import React, { ReactElement, useEffect } from 'react';
import { Header } from '../../Components';
import { PropsWithHeader } from '../../interfaces/layouts';

export default function Dash(props: PropsWithHeader): ReactElement {
    const { children } = props;

    useEffect(()=>{
        const token: string = localStorage.getItem('token-login') || '';

        if (token === '') {
            window.location.href = '/';
        }
    },[]);

    return (
        <>
            <Header />
            {children}
        </>
    );
}
