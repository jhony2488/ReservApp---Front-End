import { Meta, StoryObj } from '@storybook/react';
import ServicesContentList, { Props } from './index';
//import {mockedTasks} from '../../utils/mockedValues';

export default {
    title: 'Components/Container/Content/SearchList',
    component: ServicesContentList,
    args: {
       services:[]
    },
} as Meta<Props>;

export const ServicesContentListWithoutServices: StoryObj<Props> = {

};

export const ServicesContentListWithServices: StoryObj<Props> = {
    args: {
        //tasks:mockedTasks
    },
};