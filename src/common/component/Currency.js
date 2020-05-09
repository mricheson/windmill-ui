import React from 'react';
import NumberFormat from 'react-number-format';

export const CurrencyFormat = ({ name, inputRef, onChange, ...other }) => (
    <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
                target: {
                    name,
                    value: values.value,
                },
            });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        decimalScale={2}
        fixedDecimalScale
    />
);