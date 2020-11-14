import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import Select from 'react-select'
import investigationGroups from '../../../../assets/resources/investigation-groups'

const counties = [{ value: 'all', label: 'כל הנפות' }, ...investigationGroups];

export default () => {
    const classes = useStyles();
    const [selected, setSelected] = useState({});

    const handleChange = (selectedLabel) => {
        setSelected(selectedLabel);
    }

    const submit = async () => {
        try {
            if (selected.value === 'all') {
                await Axios.put('/api/counties')
            } else {
                await Axios.put(`/api/counties/${selected.value}`)
            }
        } catch (e) {
            alert('קרתה שגיאה')
            console.log(e)
        }

        alert('הפעולה בוצעה!')
    }

    return (
        <Box className={classes.modal}>
            <Box display='flex' justifyContent='center'>
                <Typography variant='h5'>{'נא לבחור נפה לכיבוי'}</Typography>
            </Box>
            <Select
                searchable
                options={counties}
                onChange={handleChange}
                styles={{ width: '100%' }}
            />
            <Button className={classes.button} onClick={submit}>{'כבה משתמשים'}</Button>
        </Box>
    )
}

const useStyles = makeStyles({
    modal: {
        padding: '20px',
        backgroundColor: '#fefefe',
        margin: 'auto',
        border: '1px solid #888',
        alignSelf: 'center',
        width: '300px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        margin: '8px 15px',
        height: 'fit-content',
        color: 'white',
        backgroundColor: '#00838F',
    }
})