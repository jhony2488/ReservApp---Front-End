/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';
import Input  from './index';

export default {
    title: 'Components/Inputs',
    component: Input,
    args: {
        onChange: (value:string) => console.log(value), onSubmit: () => null, value: ''
    },
} as Meta<any>;

export const InputWithoutValue: StoryObj<any> = {

};

export const InputSearchWithValue: StoryObj<any> = {
    args: {
        value: 'jhony'
    },
};