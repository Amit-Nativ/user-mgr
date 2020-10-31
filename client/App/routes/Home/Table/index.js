import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox, makeStyles, TextField } from '@material-ui/core';
import FinalForm from './table'
import { Form, Field } from "react-final-form";


export default ({ results, onGroupChange, onAdminChange }) => {
    const classes = useStyles();

    const TextFieldAdapter = ({ input, meta, ...rest }) => (
        <TextField
            {...input}
            {...rest}
            onChange={(event, value) => input.onChange(value)}
            errortext={meta.touched ? meta.error : ''}
        />
    )

    const required = (value) => (value ? undefined : "Required");
    const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
    const minValue = (min) => (value) =>
        isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
    const composeValidators = (...validators) => (value) =>
        validators.reduce((error, validator) => error || validator(value), undefined);


    const onSubmit = async (values) => {
        window.alert(JSON.stringify(values, 0, 2));
    };

    //   const ToggleAdapter = ({ input: { onChange, value }, label, ...rest }) => (
    //     <Toggle
    //       label={label}
    //       toggled={!!value}
    //       onToggle={(event, isInputChecked) => onChange(isInputChecked)}
    //       {...rest}
    //     />
    //   )

    //   const ReactSelectAdapter = ({ input, ...rest }) => (
    //     <Select {...input} {...rest} searchable />
    //   )


    // return (<FinalForm />)
    return (
        <TableContainer className={classes.container}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell align="right">{'שם משתמש'}</TableCell>
                        <TableCell align="right">{'שם מלא'}</TableCell>
                        <TableCell align="right">{'נפה'}</TableCell>
                        <TableCell align="right">{'אדמין'}</TableCell>
                    </TableRow>
                </TableHead>
                {results.map((user, i) => (
                    <Form
                        onSubmit={onSubmit}
                        component={TableBody}
                        key={user.id}
                        initialValues={results}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <TableRow >
                                    <TableCell align="right">{user.id} </TableCell>
                                    <TableCell align="right">
                                        <Field
                                            name="user_name"
                                            component={TextFieldAdapter}
                                            validate={required}
                                        />
                                    </TableCell>
                                    <TableCell align="right"

                                        value={user.investigation_group}
                                        component={TextField}
                                        type='number'
                                        onChange={onGroupChange}>
                                        {user.investigation_group}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color='primary'
                                            checked={user.is_admin ? true : false}
                                            onChange={onAdminChange} />
                                    </TableCell>
                                </TableRow>


                                <pre>{JSON.stringify(values, 0, 2)}</pre>

                            </form>
                        )}
                    />
                ))}
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles({
    container: {
        height: '430px'
    }
});