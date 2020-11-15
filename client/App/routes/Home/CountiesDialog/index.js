import { Box, Button, makeStyles, Modal, Typography } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import Select from 'react-select'
import counties from '../../../../assets/resources/counties'

export default () => {
    const classes = useStyles();
    const [selected, setSelected] = useState(undefined);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleChange = (selectedLabel) => {
        setSelected(selectedLabel);
    }

    const handleSubmitConfirmed = async () => {
        try {
            if (selected.value === 'all') {
                await Axios.put('/api/counties')
            } else {
                await Axios.put(`/api/counties/${selected.value}`)
            }

            alert('הפעולה בוצעה!')
        } catch (e) {
            alert('קרתה שגיאה')
            console.log(e)
        }
    }

    const handleSubmit = () => {
        if (!selected) {
            alert('יש לבחור נפה לכיבוי')
            return;
        }

        setConfirmationOpen(true);
    }

    const handleClose = () => setConfirmationOpen(false);

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
            <Button className={classes.button} onClick={handleSubmit}>{'העבר את כל משתמשי הנפה למצב לא פעיל'}</Button>
            {confirmationOpen &&
                <Modal open={confirmationOpen} onClose={handleClose} display='flex'>
                    <Box height='180px!important' className={classes.modal}>
                        <Typography variant='h5'>{'הפעולה הבאה צפויה להעביר למצב "לא פעיל" את כל משתמשי הנפה ולא לאפשר להקצות להן חקירות. האם אתה בטוח שתרצה להמשיך?'}</Typography>
                        <Box display='flex' justifyContent={'space-between'}>
                            <Button onClick={handleClose}>{'ביטול'}</Button>
                            <Button onClick={handleSubmitConfirmed}>{'אישור'}</Button>
                        </Box>
                    </Box>
                </Modal>}
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
        backgroundColor: '#00acc1',
    }
})