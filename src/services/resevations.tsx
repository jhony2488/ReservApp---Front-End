import { AxiosResponse } from 'axios';
import { PropsReservations, PropsReservationsQuery } from '../interfaces/reservations';
import { api } from './api';

export const verifyReservations = ({ date, hour, name_contact, contact }: PropsReservationsQuery, email: string): Promise<AxiosResponse> => {
    const query: PropsReservationsQuery = { date, hour, name_contact, contact };

    if (!date || date === null) {
        delete query.date;
    }
    if (!hour || hour === null) {
        delete query.hour;
    }
    if (!name_contact || name_contact === null) {
        delete query.name_contact;
    }
    if (!contact || contact === null) {
        delete query.contact;
    }

    return api.get('/reservation-verify', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
        data: query
    });
};

export const getReservations = (email: string, id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/reservations${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
                email
            },
        });
    }
    return api.get('/reservations', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
    });
};

export const setReservations = ({ date, hour, name_contact, number_peoples, contact }: PropsReservations, priority?:string): Promise<AxiosResponse> => {
    const filter = `?priority=${priority}`;

    if (priority) {
        return api.post(`/reservations${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
            data: {
                date, hour, name_contact, number_peoples, contact
            }
        });
    }
    return api.post('/reservations', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            date, hour, name_contact, number_peoples, contact
        }
    });
   
};

export const updateReservations = ({ date, hour, name_contact, number_peoples, contact }: PropsReservations, id: number, email: string): Promise<AxiosResponse> => {
    return api.put(`/reservations/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
        data: {
            date, hour, name_contact, number_peoples, contact
        }
    });
};

export const deleteReservation = (id: number | string, email: string): Promise<AxiosResponse> => {
    return api.delete(`/reservations/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
            email
        },
    });
};



