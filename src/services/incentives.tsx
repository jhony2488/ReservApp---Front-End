import { AxiosResponse } from 'axios';
import { PropsIncentives } from '../interfaces/incentives';
import { api } from './api';

export const getIncentives = (email: string, id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/incentives${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
                email
            },
        });
    }
    return api.get('/incentives', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
    });
};

export const setIncentive = ({ title, description, type }: PropsIncentives, email: string): Promise<AxiosResponse> => {
    return api.post('/incentives', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email,
        },
        data: {
            title, description, type
        }
    });
};

export const updateIncentive = ({ title, description, type,incentive_id }: PropsIncentives, email: string): Promise<AxiosResponse> => {
    return api.put(`/incentives/${incentive_id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
        data: {
            title, description, type
        }
    });
};

export const deleteIncentive = (id: number | string, email: string): Promise<AxiosResponse> => {
    return api.delete(`/incentives/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
    });
};



