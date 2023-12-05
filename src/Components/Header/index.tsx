import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
    AppBar,
    IconButton,
    Toolbar,
    Container,
} from '@material-ui/core';
import { Menu as MenuIcon, Close } from '@material-ui/icons';
import { useStyles } from './style';

export default function Header() {

    const classes = useStyles();

    const [isLogged, setIslogged] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(true);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    useEffect(() => {
        const token: string = localStorage.getItem('token-login') || '';

        if (token !== '') {
            setIslogged(true);
        }
        if (isTabletOrMobile) {
            setIsOpenNav(false);
        }
    }, []);

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Container>
                    {isOpenNav && <ul className={classes.nav}>
                        {isTabletOrMobile && <IconButton
                            edge="start"
                            className={classes.menuClose}
                            color="default"
                            aria-label="close"
                            size="medium"
                            onClick={() => setIsOpenNav(!isOpenNav)}
                        >
                            <Close color="error"  fontSize='large' />
                        </IconButton>}
                        <li className={classes.itemNav}>
                            <a className={classes.linkNav} href="/registrar-reserva">
                                Fazer Reserva
                            </a>
                        </li>
                        <li className={classes.itemNav}>
                            <a className={classes.linkNav} href="/login">Login</a>
                        </li>
                        {
                            isLogged ? <>
                                <li className={classes.itemNav}>
                                    <a className={classes.linkNav} href="/admin/reservas">Consultar Reservas</a>
                                </li>
                                <li className={classes.itemNav}>
                                    <a className={classes.linkNav} href="/admin/incentivos">Consultar Incentivos/Descontos</a>
                                </li>
                            </>
                                : <></>
                        }
                    </ul>}

                    {
                        isTabletOrMobile && <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setIsOpenNav(!isOpenNav)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    }

                </Container>
            </AppBar>
        </>
    );
}