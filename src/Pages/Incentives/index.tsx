/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect ,ChangeEvent} from 'react';
import { Typography, Container, Modal, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { getIncentives, updateIncentive, deleteIncentive, setIncentive as setIncentiveItem } from '../../services/incentives';
import { IncentivesContentList, Input } from '../../Components';
import { PropsIncentives } from '../../interfaces/incentives';
import { useStyles } from './style';

export default function Incentives() {
    const classes = useStyles();

    const [incentives, setIncentives] = useState<PropsIncentives[]>([]);
    const [incentive, setIncentive] = useState<any>({ title: '', description: '', type: '', incentive_id: 0 });

    const [errors, setErros] = useState<PropsIncentives>({ title: '', description: '', type: '', incentive_id: 0 });

    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const getEmailUser = () => {
        const token: string = localStorage.getItem('token-login') || '';
        const tokenConvertion = JSON.parse(token);
        return tokenConvertion.email;
    };

    const getIncentivesDB = async () => {

        await getIncentives(getEmailUser()).then((reservations: { data: { result: []; };}) => {
            setIncentives(reservations.data.result);
        });
    };

    const handleSubmitEdit = async ({ title, description, type, incentive_id }: PropsIncentives) => {

        setErros({ title: '', description: '', type: '', incentive_id: 0 });


        if (!title || title === '') {
            errors.title = 'Coloque um titulo válido';
            setErros(errors);
            return;
        }
        if (!description || description === '') {
            errors.description = 'Coloque uma descrição válida';
            setErros(errors);
            return;
        }
        if (!type || type === '') {
            errors.type = 'Coloque um nome válido';
            setErros(errors);
            return;
        }

        await updateIncentive({ title, description, type, incentive_id }, getEmailUser()).then((response) => {
            if (response.data.message === 'Incentivo atualizado com sucesso') {
                alert(response.data.message);
                setErros({ title: '', description: '', type: '', incentive_id: 0 });
                closeModal();
                getIncentivesDB();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleCreateIncentive = async ({ title, description, type, incentive_id }: PropsIncentives) => {

        setErros({ title: '', description: '', type: '', incentive_id: 0 });

        if (!title || title === '') {
            errors.title = 'Coloque um titulo válido';
            setErros(errors);
            return;
        }
        if (!description || description === '') {
            errors.description = 'Coloque uma descrição válida';
            setErros(errors);
            return;
        }
        if (!type || type === '') {
            errors.type = 'Coloque um nome válido';
            setErros(errors);
            return;
        }

        await setIncentiveItem({ title, description, type, incentive_id }, getEmailUser()).then((response: { data: { message: string; } }) => {
            alert(response.data.message);
            closeModal();
            getIncentivesDB();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleDeleteIncentive = async (id: number) => {
        await deleteIncentive(id, getEmailUser()).then((response) => {
            if (response.data.message === 'Incentivo deletado com sucesso') {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const openModalEdit = (itemIncentives: PropsIncentives) => {
        setIncentive(itemIncentives);
        setOpenModal(!isOpenModal);
        setIsEdit(true);
    };

    const openModalCreate = () => {
        setIncentive({ title: '', description: '', type: '', incentive_id: 0 });
        setOpenModal(!isOpenModal);
        setIsEdit(false);
    };

    const closeModal = () => {
        setOpenModal(!isOpenModal);
    };

    useEffect(() => {
        getIncentivesDB();
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
                            <label htmlFor="input-title">
                                Titulo
                            </label>
                            <Input value={incentive?.title || ''} onChange={(value: {target:{value:string}}) => {
                                incentive.title = value.target.value;
                                setIncentive(incentive);

                            }} placeholder="Titulo do Incentivo" id="input-title" />
                            <p className={classes.errorMessage}>{errors.title}</p>
                        </div>

                        <div className={classes.containerInput}>
                            <label htmlFor="input-description">
                                Descrição
                            </label>
                            <Input value={incentive?.title || ''} onChange={(value: {target:{value:string}}) => {
                                incentive.description = value.target.value;
                                setIncentive(incentive);

                            }} placeholder="Descrição do Incentivo" id="input-description" />
                            <p className={classes.errorMessage}>{errors.description}</p>
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={incentive?.title || ''}
                                onChange={(value: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                                    incentive.description = value.target.value || '';
                                    setIncentive(incentive);
                                }}
                                label="Tipo"
                            >
                                <MenuItem value={'desconto'}>Desconto</MenuItem>
                                <MenuItem value={'sobremesa grátis'}>Sobremesa grátis</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <div className={classes.containerButtons}>
                        <Button variant='contained' color='primary' onClick={() => isEdit ? handleSubmitEdit(incentive) : handleCreateIncentive(incentive)}>
                            Atualizar o incentivo
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Incentivos/Descontos
                </Typography>
                <Button variant='contained' color='primary' onClick={() => openModalCreate()}>
                    +
                </Button>
                <IncentivesContentList incentives={incentives} openModalEdit={openModalEdit} handleDelete={handleDeleteIncentive} />
            </Container>
        </>
    );
}
