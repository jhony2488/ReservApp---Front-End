import { Meta, StoryObj } from '@storybook/react';
import IncentivesContentList, { Props } from './index';
import {mockedIncentives} from '../../utils/mockedValues';

export default {
    title: 'Components/Container/Content/IncentivesContentList',
    component: IncentivesContentList,
    args: {
        incentives:[]
    },
} as Meta<Props>;

export const ServicesContentListWithoutServices: StoryObj<Props> = {

};

export const ServicesContentListWithServices: StoryObj<Props> = {
    args: {
        incentives: mockedIncentives
    },
};