import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';
import { PropsIncentives } from '../../interfaces/incentives';
import { searchStyles } from './style';
import { Edit, DeleteOutline } from '@material-ui/icons';

export interface Props {
    incentives: PropsIncentives[] | [];
    openModalEdit: (item: PropsIncentives) => void;
    handleDelete: (id: number) => void;
}

export default function IncentivesContentList({ incentives, openModalEdit, handleDelete }: Props) {
    const { container, card, textContent, textNotIncentives, cardContent } = searchStyles();

    const [result, setResult] = useState<PropsIncentives[]>(incentives);

    useEffect(() => {
        setResult([]);
        setResult(incentives);
    }, [incentives]);

    return (
        <div className={container}>
            {result.length > 0 ? result?.map((item: PropsIncentives, index: number) => (
                <Card key={index} className={card}>
                    <CardContent className={cardContent}>
                        <Typography variant="h4" className={textContent}>
                            {item.title}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            {item.description}
                        </Typography>
                        <Typography variant="h4" className={textContent}>
                            Tipo  {item.type}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' onClick={() => openModalEdit(item)}>
                            <Edit />
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => handleDelete(item?.incentive_id)}>
                            <DeleteOutline color='error' />
                        </Button>
                    </CardActions>
                </Card>
            )) : <Typography variant="h4" className={textNotIncentives}>
                Nenhum desconto/incentivo encontrado
            </Typography>}
        </div>
    );
};
