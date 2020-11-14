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
            <Typography>{'select countie to turn off'}</Typography>
            <Select
                searchable
                options={counties}
                onChange={handleChange}
            />
            <Button onClick={submit}>{'turn off'}</Button>
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
        justifyContent: 'space-between'
    }
})