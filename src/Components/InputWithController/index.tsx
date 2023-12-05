import React from 'react';
import {
    FormControl,
    TextField,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { inputStyles } from './style';

export interface Props { isMask?: boolean; mask?: string; maskChar?: string; placeholder: string; id: string; type?: string; value?: string; onChange?: any; control?: any; nameInput?: string; valueInput?: string; hintText?: string; }


export default function Input({ control, nameInput, isMask = false, mask, maskChar = ' ',valueInput, onChange, id, ...rest }: Props) {
    const { search, input } = inputStyles();

    return (<>
        {control ? <Controller
            control={control}
            name={nameInput ? nameInput : '' }
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl className={search}>

                    {isMask ? <InputMask
                        mask={mask}
                        {...rest}
                        maskChar={maskChar}
                        onChange={onChange}
                        value={control ?  value: valueInput}
                    >
                        {() => <TextField
                            size="small"
                            className={input}
                            variant="outlined"
                            id={id}
                            onChange={onChange}
                            color="primary"
                            InputProps={{
                                classes: { input }
                            }}
                            {...rest}
                        />}
                    </InputMask> : <TextField
                        size="small"
                        className={input}
                        id={id}
                        onChange={onChange}
                        variant="outlined"
                        color="primary"
                        InputProps={{
                            classes: { input }
                        }}
                        {...rest}
                    />}

                </FormControl>

            )} /> : <FormControl className={search}>

            {isMask ? <InputMask
                mask={mask}
                {...rest}
                maskChar={maskChar}
            >
                {() => <TextField
                    size="small"
                    className={input}
                    variant="outlined"
                    id={id}
                    onChange={onChange}
                    value={valueInput}
                    color="primary"
                    InputProps={{
                        classes: { input }
                    }}
                    {...rest}
                />}
            </InputMask> : <TextField
                size="small"
                className={input}
                id={id}
                onChange={onChange}
                variant="outlined"
                value={valueInput}
                color="primary"
                InputProps={{
                    classes: { input }
                }}
                {...rest}
            />}

        </FormControl>}
    </>

    );
};
