import { AxiosResponse } from 'axios';
import { PropsUserLogin, PropsUsers } from '../interfaces/users';
import { api } from './api';

export const loginUser = ({ email, password }: PropsUserLogin): Promise<AxiosResponse> => {
    return api.get('/user/login', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
        data: {
            email, password
        }
    });
};

export const getUsers = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/users${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/users', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setUsers = ({ email, name, password, rule }: PropsUsers): Promise<AxiosResponse> => {
    return api.post('/users', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            email, name, password, rule
        }
    });
};

export const updateUser = ({ email, name, password, rule }: PropsUsers, id: number): Promise<AxiosResponse> => {
    return api.put(`/users/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            email, name, password, rule
        }
    });
};

export const updateRule = ({ rule }: { rule: string; }, id: number): Promise<AxiosResponse> => {
    return api.patch(`/users/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            rule
        }
    });
};

export const deleteUser = (id: number | string, email: string): Promise<AxiosResponse> => {
    return api.delete(`/users/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
    });
};



