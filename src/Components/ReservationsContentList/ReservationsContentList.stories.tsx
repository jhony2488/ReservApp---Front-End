import { Meta, StoryObj } from '@storybook/react';
import ReservationsContentList, { Props } from './index';
import {mockedReservations} from '../../utils/mockedValues';

export default {
    title: 'Components/Container/Content/ReservationsList',
    component: ReservationsContentList,
    args: {
        reservations:[]
    },
} as Meta<Props>;

export const ServicesContentListWithoutServices: StoryObj<Props> = {

};

export const ServicesContentListWithServices: StoryObj<Props> = {
    args: {
        reservations:mockedReservations
    },
};