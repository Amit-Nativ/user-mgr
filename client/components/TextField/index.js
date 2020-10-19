import { TextField, Link, Box, Typography, flexbox } from '@material-ui/core';
import React from 'react';
import useStyles from './TextField.css'

export default function (props) {
    const classes = useStyles(),
        { label } = props,
        textFieldProps = { ...props };

    delete textFieldProps.label;
    delete textFieldProps.showlink;

    return (
        <Box className={classes.root}>
            <Box display="flex" justifyContent="space-between">
                <Typography display="inline" variant="body1">{label}</Typography>
                {props.showlink &&
                    <Link variant="body1" href="#">שכחתם סיסמה?</Link>}
            </Box>
            <TextField
                inputlabelprops={{ shrink: false }}
                size="small"
                {...textFieldProps} />
        </Box>);
};
