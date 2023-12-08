/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, ChangeEvent } from 'react';
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

        await getIncentives(getEmailUser()).then((reservations: { data: { result: []; }; }) => {
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
                getIncentivesDB();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const changeInput = (key: string, value: string | boolean) => {
        setIncentive((prevState: any) => {
            return { ...prevState, [key]: value };
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
                            <Input valueInput={incentive?.title || ''} onChange={(value: { target: { value: string } }) => {
                                changeInput('title', value.target.value);
                            }} placeholder="Titulo do Incentivo" id="input-title" />
                            <p className={classes.errorMessage}>{errors.title}</p>
                        </div>

                        <div className={classes.containerInput}>
                            <label htmlFor="input-description">
                                Descrição
                            </label>
                            <Input valueInput={incentive?.description || ''} onChange={(value: { target: { value: string } }) => {
                                changeInput('description', value.target.value);
                            }} placeholder="Descrição do Incentivo" id="input-description" />
                            <p className={classes.errorMessage}>{errors.description}</p>
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={incentive?.type || ''}
                                onChange={(value: any) => {
                                    changeInput('type', value.target.value || '');
                                }}
                                label="Tipo"
                            >
                                <MenuItem style={{ color: 'black' }} value={'desconto'}>Desconto</MenuItem>
                                <MenuItem style={{ color: 'black' }} value={'sobremesa grátis'}>Sobremesa grátis</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => isEdit ? handleSubmitEdit(incentive) : handleCreateIncentive(incentive)}>
                               { isEdit ? 'Atualizar o incentivo' : 'Criar o incentivo' } 
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: 'red', color: 'white' }} onClick={() => closeModal()}>
                                Sair
                            </Button>
                        </div>
                    </Box>

                </Box>
            </Modal>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Incentivos/Descontos
                </Typography>
                <Button variant='contained' style={{ marginTop: '12px' }} color='secondary' onClick={() => openModalCreate()}>
                    + Adicionar
                </Button>
                <IncentivesContentList incentives={incentives} openModalEdit={openModalEdit} handleDelete={handleDeleteIncentive} />
            </Container>
        </>
    );
}
