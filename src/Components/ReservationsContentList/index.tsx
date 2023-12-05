import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';
import { PropsReservations} from '../../interfaces/reservations';
import { searchStyles } from './style';
import { Edit, CheckCircle, Close, DeleteOutline } from '@material-ui/icons';

export interface Props {
    reservations: PropsReservations[] | [];
    openModalEdit: (item: PropsReservations) => void;
    handleDelete: (id: any) => void;
}

export default function ReservationsContentList({ reservations, openModalEdit, handleDelete }: Props) {
    const { container, card, textContent, textNotContent, spanTextContent, cardContent } = searchStyles();

    const [result, setResult] = useState<PropsReservations[]>(reservations);

    useEffect(() => {
        setResult([]);
        setResult(reservations);
    }, [reservations]);

    return (
        <div className={container}>
            {result.length > 0 ? result?.map((item: PropsReservations, index: number) => (
                <Card key={index} className={card}>
                    <CardContent className={cardContent}>
                        <Typography variant="h4" className={textContent}>
                            Data: {item.date}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            Hora: {item.hour}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            Numero de pessoas: {item.number_peoples}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            Nome do contato: {item.name_contact}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            Número de contato: {item.contact}
                        </Typography>
                        <span className={spanTextContent}>{item.active ? <CheckCircle color='secondary' /> : <Close color='error' />}</span>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' onClick={() => openModalEdit(item)}>
                            <Edit />
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => handleDelete(item.reservation_id)}>
                            <DeleteOutline color='error' />
                        </Button>
                    </CardActions>
                </Card>
            )) : <Typography variant="h4" className={textNotContent}>
                Nenhuma Reserva encontrada
            </Typography>}
        </div>
    );
};
