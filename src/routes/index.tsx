import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { RouteLayout } from '../Components';
import WithHeader from '../Layouts/WithHeader';
import WithHeaderAdmin from '../Layouts/WithHeaderAdmin';
import { Home, Page404, Login, Incentives, Reservas, SucessCreatedReserv } from '../Pages';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/registrar-reserva" />
                <RouteLayout path="/registrar-reserva" exact component={Home} layout={WithHeader} />
                <RouteLayout path="/login" exact component={Login} layout={WithHeader} />
                <RouteLayout path="/sucesso" exact component={SucessCreatedReserv} layout={WithHeader} />
                <RouteLayout path="/admin/reservas" exact component={Reservas} layout={WithHeaderAdmin} />
                <RouteLayout path="/admin/incentivos" exact component={Incentives} layout={WithHeaderAdmin} />
                <RouteLayout path="*" exact component={Page404} layout={WithHeader} isError404 />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
