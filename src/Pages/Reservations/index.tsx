/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, Checkbox, Button } from '@material-ui/core';
import { getReservations, updateReservations, deleteReservation } from '../../services/resevations';
import { ReservationsContentList, Input } from '../../Components';
import { PropsReservations } from '../../interfaces/reservations';
import { useStyles } from './style';

export default function Reservas() {
    const classes = useStyles();

    const [reservations, setReservations] = useState<PropsReservations[]>([]);
    const [reservation, setReservation] = useState<PropsReservations>({ date: '', hour: '', name_contact: '', number_peoples: '', contact: '', reservation_id: 0 ,active: true});
    const [errors, setErros] = useState<PropsReservations>({ date: '', hour: '', name_contact: '', number_peoples: '', contact: '' });
    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    const getEmailUser = () => {
        const token: string = localStorage.getItem('token-login') || '';
        const tokenConvertion = JSON.parse(token);
        return tokenConvertion.email;
    };

    const handleSubmitEdit = async ({ date, hour, name_contact, number_peoples, contact, reservation_id }: PropsReservations) => {

        setErros({ date: '', hour: '', name_contact: '', number_peoples: '', contact: '' });

        if (!date || date === '') {
            errors.date = 'Coloque uma data válida';
        }
        if (!hour || hour === '') {
            errors.hour = 'Coloque uma hora válida';
        }
        if (!name_contact || name_contact === '') {
            errors.name_contact = 'Coloque um nome válido';
        }
        if (!number_peoples || number_peoples === '') {
            errors.number_peoples = 'Coloque um número válido de pessoas';
        }
        if (!contact || contact === '') {
            errors.contact = 'Coloque um número de telefone válido';
        }


        await updateReservations({ date, hour, name_contact, number_peoples, contact }, reservation_id || 0, getEmailUser()).then((response) => {
            if (response.data.message === 'Reserva atualizada com sucesso') {
                alert('Reserva atualizada com sucesso');
                setOpenModal(!isOpenModal);
                setErros({ date: '', hour: '', name_contact: '', number_peoples: '', contact: '' });
            }
        }).catch((error) => {
            if (error.data.message === 'Reserva já existente' || error.message === 'Reserva já existente') {
                alert('Já existe uma reserva nesse horário');
                setErros({ date: '', hour: '', name_contact: '', number_peoples: '', contact: '' });
            }
        });
    };

    const handleSubmitDelete = async (reservation_id: number) => {

        await deleteReservation(reservation_id, getEmailUser()).then((response) => {
            if (response.data.message === 'Reserva deletada com sucesso') {
                alert('Reserva deletada com sucesso');
            }
        });
    };

    const getReservationsDB = async () => {

        await getReservations(getEmailUser()).then((reservations: { data: { result: [] } }) => {
            setReservations(reservations.data.result);
        });
    };

    const openModalEdit = (itemReservation: PropsReservations) => {
        setReservation(itemReservation);
        setOpenModal(!isOpenModal);
    };

    const closeModal = () => {
        setOpenModal(!isOpenModal);
    };

    useEffect(() => {
        getReservationsDB();
    }, []);

    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box}>

                    <Box className={classes.boxWrapper}>
                        <div className={classes.containerInput}>
                            <label htmlFor="input-date">
                                Data
                            </label>
                            <Input isMask mask='99/99/9999' value={reservation?.date || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.date = value.target.value;
                                setReservation(reservation);

                            }} placeholder="29/01/2034" id="input-date" />
                            <p className={classes.errorMessage}>{errors.date}</p>
                        </div>

                        <div className={classes.containerInput}>
                            <label htmlFor="input-hour">
                                Hora
                            </label>
                            <Input isMask mask='99:99' value={reservation?.hour || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.hour = value.target.value;
                                setReservation(reservation);

                            }} placeholder="14:00" id="input-hour" />
                            <p className={classes.errorMessage}>{errors.hour}</p>
                        </div>
                        <div className={classes.containerInput}>
                            <label htmlFor="input-peoples">
                                Numero de pessoas
                            </label>
                            <Input value={reservation?.number_peoples || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.number_peoples = value.target.value;
                                setReservation(reservation);

                            }} type="number" placeholder="5" id="input-peoples" />
                            <p className={classes.errorMessage}>{errors.number_peoples}</p>
                        </div>


                        <div className={classes.containerInput}>
                            <label htmlFor="input-name">
                                Nome da pessoa para contato
                            </label>
                            <Input id="input-name" placeholder=" Jhonata Vinicius" value={reservation?.name_contact || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.name_contact = value.target.value;
                                setReservation(reservation);

                            }} />
                            <p className={classes.errorMessage}>{errors.name_contact}</p>
                        </div>

                        <div className={classes.containerInput}>
                            <label htmlFor="input-contact">
                                Número de contato
                            </label>
                            <Input id="input-contact" isMask mask='(99) 9 9999-9999' placeholder="(81) 9 9488-0190" value={reservation?.contact || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.contact = value.target.value;
                                setReservation(reservation);

                            }} />
                            <p className={classes.errorMessage}>{errors.contact}</p>
                        </div>
                        <div className={classes.containerInput}>
                            <label htmlFor="input-contact">
                                Reserva {reservation?.active ? 'Ativa' : 'Desativada ou Vencida'}
                            </label>
                            <Checkbox value={reservation?.active || ''} onChange={(value: { target: { value: string } }) => {
                                reservation.active = value.target.value === 'true' ? true : false;
                                setReservation(reservation);
                            }} />
                        </div>
                    </Box>
                    <div className={classes.containerButtons}>
                        <Button variant='contained' color='primary' onClick={() => handleSubmitEdit(reservation)}>
                            Atualizar a Reserva
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Reservas
                </Typography>
                <ReservationsContentList reservations={reservations} openModalEdit={openModalEdit} handleDelete={handleSubmitDelete} />
            </Container>
        </>
    );
}
