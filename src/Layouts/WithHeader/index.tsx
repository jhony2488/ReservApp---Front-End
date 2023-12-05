import React, { ReactElement } from 'react';
import { Header } from '../../Components';
import { PropsWithHeader } from '../../interfaces/layouts';

export default function Dash(props: PropsWithHeader): ReactElement {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
        </>
    );
}
