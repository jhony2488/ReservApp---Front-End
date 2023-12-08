/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Container, Box, Button, Modal, ButtonGroup } from '@material-ui/core';
import { schemaReservation } from '../../schemasValidations/reservations';
import { Input } from '../../Components';
import { setReservations } from '../../services/resevations';
import { PropsReservations } from '../../interfaces/reservations';
import { useStyles } from './style';

export default function Home() {
    const classes = useStyles();

    const [incentives, setIncentives] = useState<any>();
    const [sugestions, setSugestions] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [isOccupacionHistory, setIsOccupacionHistory] = useState(false);
    const [hourInput, setHourInput] = useState('');

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        resolver: yupResolver(schemaReservation),
    });

    const closeModal = () => {
        setOpenModal(!isOpenModal);
    };

    const setHour = (hour: string) => {
        setHourInput(hour);
    };

    const handleSubmitReservation = async ({ date, hour, inputNameContact, numberPeoples, inputContact }: any) => {
        const result: PropsReservations = {
            date, hour: hourInput === '' ? hour : hourInput, name_contact: inputNameContact, number_peoples: numberPeoples, contact: inputContact };

            await setReservations(result).then((response: any) => {
                console.log(response.data);
                setIncentives(response.data.incentives);
                if (response.data.message === 'Reserva criada com sucesso') {
                    window.location.href = '/sucesso';
                    reset();
                }
            }).catch((error: any) => {
                console.error(error);
                if (error?.data?.incentives) {
                    setIncentives(error?.data?.incentives);

                    if (error?.data?.sugestionsHoursHistoryOccupation) {
                        setSugestions(error.data.sugestionsHoursHistoryOccupation);
                        setIsOccupacionHistory(true);
                    }
                    if (error?.data?.sugestions) {
                        setIsOccupacionHistory(false);
                        setSugestions(error.data.sugestions);
                    }
                }

                setOpenModal(!isOpenModal);

            });
        };


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
                            <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h2">
                                Já existe uma reserva no horário especificado
                            </Typography>

                            <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h3">
                                Sugestões de horários disponiveis{isOccupacionHistory ? ' com base no seu histórico' : ''}:
                            </Typography>

                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                {sugestions?.map((item: string, key) => {
                                    return (
                                        <Button key={key} onClick={() => {
                                            setHour(item);
                                        }}>{item}</Button>
                                    );
                                })}

                            </ButtonGroup>

                            <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h3">
                                Horários com { incentives?.incentives ? typeof incentives?.incentives === 'object' ? incentives?.incentives[0] ? incentives?.incentives[0].title : '' : incentives?.incentives[0].title : ''}
                            </Typography>

                            <ButtonGroup variant="contained" aria-label="outlined primary button group">

                                {incentives?.results?.map((item: string, key: number) => {
                                    return <Button key={key} onClick={() => {
                                        setHour(item);
                                    }}>{item}</Button>;
                                })}
                            </ButtonGroup>

                            <div className={classes.containerButtons}>
                                <Button variant='contained' color='inherit' onClick={() => closeModal()}>
                                    Sair
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Modal>
                <Container className={classes.main}>
                    <Typography className={classes.title}>
                        Faça a reserva
                    </Typography>
                    <form onSubmit={handleSubmit(handleSubmitReservation)}>
                        <Box className={classes.box}>

                            <Box className={classes.boxWrapper}>
                                <div className={classes.containerInput}>
                                    <label htmlFor="input-date">
                                        Data
                                    </label>

                                    <Input control={control} nameInput={'date'} isMask mask='99/99/9999' placeholder="29/01/2034" id="input-date" />
                                    <p className={classes.errorMessage}>{errors.date?.message}</p>
                                </div>

                                <div className={classes.containerInput}>
                                    <label htmlFor="input-hour">
                                        Hora
                                    </label>
                                    <Input control={hourInput === '' ? control : null} nameInput={'hour'} valueInput={hourInput} onChange={(itemHour: string) => setHourInput(itemHour)} isMask mask='99:99:99' placeholder="14:00" id="input-hour" />
                                    <p className={classes.errorMessage}>{errors.hour?.message}</p>
                                </div>
                                <div className={classes.containerInput}>
                                    <label htmlFor="input-peoples">
                                        Numero de pessoas
                                    </label>
                                    <Input control={control} nameInput={'numberPeoples'} type="number" placeholder="5" id="input-peoples" />
                                    <p className={classes.errorMessage}>{errors.numberPeoples?.message}</p>
                                </div>


                                <div className={classes.containerInput}>
                                    <label htmlFor="input-name">
                                        Nome da pessoa para contato
                                    </label>
                                    <Input control={control} nameInput={'inputNameContact'} id="input-name" placeholder=" Jhonata Vinicius" />
                                    <p className={classes.errorMessage}>{errors.inputNameContact?.message}</p>
                                </div>

                                <div className={classes.containerInput}>
                                    <label htmlFor="input-contact">
                                        Número de contato
                                    </label>
                                    <Input control={control} nameInput={'inputContact'} id="input-contact" isMask mask='(99) 9 9999-9999' placeholder="(81) 9 9488-0190" />
                                    <p className={classes.errorMessage}>{errors.inputContact?.message}</p>
                                </div>
                            </Box>
                            <div className={classes.containerButtons}>
                                <Button variant='contained' color='primary' type='submit'>
                                    Fazer a Reserva
                                </Button>
                            </div>
                        </Box>
                    </form>

                </Container>
            </>
        );
    }
